import { useEffect, useRef, useState, type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineClozeInput,
    InlineFeedback,
    InlineLinkedHighlight,
    InteractionHintSequence,
    InlineTooltip,
} from "@/components/atoms";
import { Figure, FigureSlider } from "@/components/molecules";
import { useVar, useSetVar } from "@/stores";
import { clamp, useRafLoop, useSpring } from "@/lib/motion";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    linkedHighlightPropsFromDefinition,
} from "../variables";

/* ------------------------------------------------------------------ *
 * Falling figure — a basketball dropped beside a measuring pole.
 * Students slide three tags to where they think the ball will be after
 * 1, 2 and 3 seconds, then release the ball and meet the real answer.
 * ------------------------------------------------------------------ */

const VIEWBOX_WIDTH = 560;
const VIEWBOX_HEIGHT = 440;
const PAD = 24;
const POLE_X = 130;
const TOP_Y = 50;
const BOTTOM_Y = 410;
const METRE_MAX = 50;
const PX_PER_METRE = (BOTTOM_Y - TOP_Y) / METRE_MAX;
const BALL_X = 164;
const TAG_X = 236;
const TAG_WIDTH = 54;
const GAP_X = 430;
const MAX_TIME = 3;

const ACCENT = "#62D0AD";
const INK = "#334155";
const STRUCTURE = "#64748B";

const yForMetres = (metres: number) => TOP_Y + metres * PX_PER_METRE;
const metresFallen = (seconds: number) => 5 * seconds * seconds;
const formatMetres = (metres: number) => `${metres.toFixed(1)} m`;

const GUESS_VARS = ["fallingGuessOne", "fallingGuessTwo", "fallingGuessThree"] as const;
const GUESS_DEFAULTS = [8, 16, 24];
const SECONDS = [1, 2, 3];
const GAP_IDS = ["gap-first", "gap-second", "gap-third"];

function FallingPoleDrawing() {
    const setVar = useSetVar();
    const guessOne = useVar<number>("fallingGuessOne", GUESS_DEFAULTS[0]);
    const guessTwo = useVar<number>("fallingGuessTwo", GUESS_DEFAULTS[1]);
    const guessThree = useVar<number>("fallingGuessThree", GUESS_DEFAULTS[2]);
    const time = useVar<number>("fallingDropTime", 0);
    const playing = useVar<boolean>("fallingDropPlaying", false);
    const highlight = useVar<string>("fallingGapHighlight", "");

    const [dragging, setDragging] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const guesses = [guessOne, guessTwo, guessThree];

    // Replaying from the end starts the fall over rather than sitting still.
    useEffect(() => {
        if (playing && time >= MAX_TIME - 0.001) setVar("fallingDropTime", 0);
    }, [playing, time, setVar]);

    useRafLoop((dt) => {
        const next = time + dt * 0.7;
        if (next >= MAX_TIME) {
            setVar("fallingDropTime", MAX_TIME);
            setVar("fallingDropPlaying", false);
        } else {
            setVar("fallingDropTime", next);
        }
    }, { paused: !playing });

    const depth = Math.min(metresFallen(time), METRE_MAX);
    const ballY = yForMetres(depth);
    const handleScale = useSpring(dragging !== null || hovered !== null ? 1.1 : 1, {
        stiffness: 400,
        damping: 26,
    });

    const pointerToMetres = (clientY: number) => {
        const svg = svgRef.current;
        if (!svg) return 0;
        const rect = svg.getBoundingClientRect();
        const y = ((clientY - rect.top) / rect.height) * VIEWBOX_HEIGHT;
        const metres = clamp((y - TOP_Y) / PX_PER_METRE, 0, METRE_MAX);
        return Math.round(metres * 2) / 2;
    };

    const gapsVisible = time >= MAX_TIME - 0.001 || highlight !== "";
    const dimOthers = highlight ? 0.35 : 1;

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className="block w-full"
            style={{ touchAction: "none" }}
        >
            <g opacity={dimOthers} style={{ transition: "opacity 150ms ease-out" }}>
                {/* time readout */}
                <text x={PAD} y={28} fill={INK} fontSize="12" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {`t = ${time.toFixed(1)} s`}
                </text>
                <text x={POLE_X - 18} y={28} fill={STRUCTURE} fontSize="11" textAnchor="end">
                    metres fallen
                </text>
                <text x={TAG_X + TAG_WIDTH / 2} y={28} fill={STRUCTURE} fontSize="11" textAnchor="middle">
                    your guess
                </text>
                <text x={TAG_X + TAG_WIDTH + 16} y={28} fill={STRUCTURE} fontSize="11">
                    actual
                </text>

                {/* the measuring pole */}
                <line
                    x1={POLE_X} y1={TOP_Y} x2={POLE_X} y2={BOTTOM_Y}
                    stroke={STRUCTURE} strokeWidth="2" strokeLinecap="round"
                />
                {[0, 10, 20, 30, 40, 50].map((metres) => (
                    <g key={`tick-${metres}`}>
                        <line
                            x1={POLE_X - 16} y1={yForMetres(metres)} x2={POLE_X} y2={yForMetres(metres)}
                            stroke={STRUCTURE} strokeWidth="1.5" strokeLinecap="round"
                        />
                        <text
                            x={POLE_X - 20} y={yForMetres(metres) + 4}
                            fill={STRUCTURE} fontSize="11" textAnchor="end"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                            {metres}
                        </text>
                    </g>
                ))}
                <line
                    x1={POLE_X - 30} y1={BOTTOM_Y} x2={TAG_X + TAG_WIDTH} y2={BOTTOM_Y}
                    stroke={STRUCTURE} strokeWidth="2" strokeLinecap="round"
                />

                {/* revealed true positions */}
                {SECONDS.map((second) => {
                    const revealed = time >= second - 0.001;
                    if (!revealed) return null;
                    const trueDepth = metresFallen(second);
                    const y = yForMetres(trueDepth);
                    return (
                        <g key={`actual-${second}`}>
                            <line
                                x1={POLE_X + 6} y1={y} x2={TAG_X + TAG_WIDTH + 4} y2={y}
                                stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round"
                            />
                            <text
                                x={TAG_X + TAG_WIDTH + 16} y={y + 4}
                                fill={ACCENT} fontSize="11"
                                style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                                {`${second} s: ${formatMetres(trueDepth)}`}
                            </text>
                        </g>
                    );
                })}

                {/* the student's three tags */}
                {GUESS_VARS.map((varName, index) => {
                    const metres = guesses[index];
                    const y = yForMetres(metres);
                    const second = SECONDS[index];
                    const revealed = time >= second - 0.001;
                    const close = revealed && Math.abs(metres - metresFallen(second)) <= 2;
                    const scale = dragging === index || hovered === index ? handleScale : 1;
                    return (
                        <g key={varName}>
                            <line
                                x1={POLE_X + 2} y1={y} x2={TAG_X} y2={y}
                                stroke={STRUCTURE} strokeWidth="1.5" strokeDasharray="4 4"
                                opacity={0.7}
                            />
                            <g transform={`translate(${TAG_X + TAG_WIDTH / 2} ${y}) scale(${scale})`}>
                                <rect
                                    x={-TAG_WIDTH / 2} y={-13} width={TAG_WIDTH} height={26} rx="6"
                                    fill={close ? ACCENT : "#FFFFFF"}
                                    stroke={close ? ACCENT : STRUCTURE}
                                    strokeWidth="2"
                                    filter="url(#falling-tag-shadow)"
                                />
                                <text
                                    x={0} y={4} textAnchor="middle" fontSize="12"
                                    fill={close ? "#FFFFFF" : INK}
                                    style={{ fontVariantNumeric: "tabular-nums" }}
                                >
                                    {`${second} s`}
                                </text>
                            </g>
                            <rect
                                x={TAG_X - 6} y={y - 20} width={TAG_WIDTH + 12} height={40}
                                fill="transparent"
                                style={{ cursor: dragging === index ? "grabbing" : "grab", touchAction: "none" }}
                                onPointerDown={(event) => {
                                    event.currentTarget.setPointerCapture(event.pointerId);
                                    setDragging(index);
                                }}
                                onPointerMove={(event) => {
                                    if (dragging !== index) return;
                                    setVar(varName, pointerToMetres(event.clientY));
                                }}
                                onPointerUp={() => setDragging(null)}
                                onPointerCancel={() => setDragging(null)}
                                onPointerEnter={() => setHovered(index)}
                                onPointerLeave={() => setHovered(null)}
                            />
                        </g>
                    );
                })}

                {/* the falling basketball */}
                <circle cx={BALL_X} cy={ballY} r="11" fill={ACCENT} />
                <text
                    x={BALL_X + 16} y={ballY - 12}
                    fill={ACCENT} fontSize="12"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                >
                    {formatMetres(depth)}
                </text>
            </g>

            {/* how far it dropped in each separate second */}
            {gapsVisible && (
                <>
                    <text
                        x={VIEWBOX_WIDTH - PAD} y={28}
                        fill={STRUCTURE} fontSize="11" textAnchor="end"
                        opacity={dimOthers}
                        style={{ transition: "opacity 150ms ease-out" }}
                    >
                        drop in each second
                    </text>
                    {SECONDS.map((second, index) => {
                        const from = metresFallen(second - 1);
                        const to = metresFallen(second);
                        const yFrom = yForMetres(from);
                        const yTo = yForMetres(to);
                        const id = GAP_IDS[index];
                        const active = highlight === id;
                        const opacity = highlight && !active ? 0.35 : 1;
                        return (
                            <g
                                key={id}
                                opacity={opacity}
                                style={{ transition: "opacity 150ms ease-out", cursor: "default" }}
                                onPointerEnter={() => setVar("fallingGapHighlight", id)}
                                onPointerLeave={() => setVar("fallingGapHighlight", "")}
                            >
                                {active && (
                                    <line
                                        x1={GAP_X} y1={yFrom} x2={GAP_X} y2={yTo}
                                        stroke={ACCENT} strokeWidth="10" opacity="0.28" strokeLinecap="round"
                                    />
                                )}
                                <line
                                    x1={GAP_X} y1={yFrom} x2={GAP_X} y2={yTo}
                                    stroke={ACCENT} strokeWidth={active ? 4.5 : 2.5} strokeLinecap="round"
                                    style={{ transition: "stroke-width 150ms ease-out" }}
                                />
                                <line x1={GAP_X - 6} y1={yFrom} x2={GAP_X + 6} y2={yFrom} stroke={ACCENT} strokeWidth="2" />
                                <line x1={GAP_X - 6} y1={yTo} x2={GAP_X + 6} y2={yTo} stroke={ACCENT} strokeWidth="2" />
                                <text
                                    x={GAP_X + 14} y={(yFrom + yTo) / 2 + 4}
                                    fill={active ? ACCENT : INK} fontSize="11"
                                    fontWeight={active ? 600 : 400}
                                    style={{ fontVariantNumeric: "tabular-nums" }}
                                >
                                    {formatMetres(to - from)}
                                </text>
                                <rect
                                    x={GAP_X - 12} y={yFrom} width="70" height={yTo - yFrom} fill="transparent"
                                />
                            </g>
                        );
                    })}
                </>
            )}

            <defs>
                <filter id="falling-tag-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.2" />
                </filter>
            </defs>
        </svg>
    );
}

function FallingPoleFigure() {
    const setVar = useSetVar();
    const guessOne = useVar<number>("fallingGuessOne", GUESS_DEFAULTS[0]);
    const guessTwo = useVar<number>("fallingGuessTwo", GUESS_DEFAULTS[1]);
    const guessThree = useVar<number>("fallingGuessThree", GUESS_DEFAULTS[2]);
    const moved =
        guessOne !== GUESS_DEFAULTS[0] ||
        guessTwo !== GUESS_DEFAULTS[1] ||
        guessThree !== GUESS_DEFAULTS[2];

    return (
        <Figure
            id="falling-pole"
            playable
            playVarName="fallingDropPlaying"
            onReset={() => {
                setVar("fallingGuessOne", GUESS_DEFAULTS[0]);
                setVar("fallingGuessTwo", GUESS_DEFAULTS[1]);
                setVar("fallingGuessThree", GUESS_DEFAULTS[2]);
                setVar("fallingDropTime", 0);
                setVar("fallingDropPlaying", false);
                setVar("fallingGapHighlight", "");
            }}
            caption="Slide the three tags to where you think the basketball will be after 1, 2 and 3 seconds, then press play and watch the real positions appear."
        >
            <FallingPoleDrawing />
            <div className="px-6 pb-5">
                <FigureSlider
                    varName="fallingDropTime"
                    label="Time since release"
                    {...numberPropsFromDefinition(getVariableInfo("fallingDropTime"))}
                    formatValue={(value) => `${value.toFixed(1)} s`}
                />
            </div>
            <InteractionHintSequence
                hintKey="falling-pole-tags"
                currentStep={moved ? 1 : 0}
                steps={[
                    {
                        gesture: "drag-vertical",
                        label: "Drag the 1 s tag to your guess",
                        position: { x: "47%", y: "23%" },
                        dragPath: { type: "line", startOffset: { x: 0, y: -22 }, endOffset: { x: 0, y: 22 } },
                    },
                    {
                        gesture: "click",
                        label: "Press play and let the ball fall",
                        position: { x: "92%", y: "7%" },
                    },
                ]}
            />
        </Figure>
    );
}

export const projectileFallingBlocks: ReactElement[] = [
    <StackLayout key="layout-falling-heading" maxWidth="xl">
        <Block id="falling-heading" padding="md">
            <EditableH2 id="h2-falling-heading" blockId="falling-heading">
                Falling, All On Its Own
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-setup" maxWidth="xl">
        <Block id="falling-setup" padding="sm">
            <EditableParagraph id="para-falling-setup" blockId="falling-setup">
                Forget sideways for a moment and watch only the falling. A dropped ball speeds up as it
                goes, gaining about 10 metres per second of speed every second.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-hook" maxWidth="xl">
        <Block id="falling-hook" padding="sm">
            <EditableParagraph id="para-falling-hook" blockId="falling-hook">
                So how far has it dropped after one second, or after three? Slide the three tags down the
                pole to your best guess, then press play and let the ball settle it.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-visual" maxWidth="xl">
        <Block id="falling-visual" padding="sm" hasVisualization>
            <FallingPoleFigure />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-reflection" maxWidth="xl">
        <Block id="falling-reflection" padding="sm">
            <EditableParagraph id="para-falling-reflection" blockId="falling-reflection">
                Look at the fall{" "}
                <InlineLinkedHighlight
                    varName="fallingGapHighlight"
                    highlightId="gap-third"
                    {...linkedHighlightPropsFromDefinition(getVariableInfo("fallingGapHighlight"))}
                >
                    in that third second alone
                </InlineLinkedHighlight>
                : 25 metres, five times the first second's drop. Each second buys a bigger fall than the
                one before it.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-question-pattern" maxWidth="xl">
        <Block id="falling-question-pattern" padding="md">
            <EditableParagraph id="para-falling-question-pattern" blockId="falling-question-pattern">
                The ball drops 5 m in its first second, 15 m in its second and 25 m in its third. If the
                pole were taller, the metres it would drop during its fourth second is{" "}
                <InlineFeedback
                    varName="answerFallingFourthSecond"
                    correctValue={["35", "35 m"]}
                    position="terminal"
                    successMessage="— exactly, the drops climb by a steady 10 m each second, so 25 becomes 35"
                    failureMessage="— not quite yet."
                    hint="Look at how much each drop grows on the one before it"
                    reviewBlockId="falling-visual"
                    reviewLabel="Back to the falling ball"
                    visualizationHint={{
                        blockId: "falling-visual",
                        hintKey: "falling-fourth-second-hint",
                        steps: [
                            {
                                gesture: "click",
                                label: "Press play and let the ball fall the whole way",
                                position: { x: "92%", y: "7%" },
                                completionVar: "fallingDropTime",
                                completionValue: 3,
                                completionTolerance: 0.2,
                            },
                        ],
                        label: "Discover it yourself",
                        resetVars: { fallingDropTime: 0, fallingDropPlaying: false },
                    }}
                >
                    <InlineClozeInput
                        varName="answerFallingFourthSecond"
                        correctAnswer={["35", "35 m"]}
                        {...clozePropsFromDefinition(getVariableInfo("answerFallingFourthSecond"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-falling-question-speed" maxWidth="xl">
        <Block id="falling-question-speed" padding="md">
            <EditableParagraph id="para-falling-question-speed" blockId="falling-question-speed">
                A coin knocked off a shelf falls for 2 seconds before anyone catches it. In metres per
                second, it is falling at{" "}
                <InlineFeedback
                    varName="answerFallingSpeedTwoSeconds"
                    correctValue={["20", "20 m/s", "20m/s"]}
                    position="terminal"
                    successMessage="— spot on, 10 m/s gained in the first second and another 10 in the second"
                    failureMessage="— have another go."
                    hint="Falling adds about 10 m/s of speed for every second in the air"
                    reviewBlockId="falling-setup"
                    reviewLabel="Back to the speeding-up rule"
                >
                    <InlineClozeInput
                        varName="answerFallingSpeedTwoSeconds"
                        correctAnswer={["20", "20 m/s", "20m/s"]}
                        {...clozePropsFromDefinition(getVariableInfo("answerFallingSpeedTwoSeconds"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1787191394579" maxWidth="xl">
        <Block id="block-1787191394579" padding="sm">
            <EditableParagraph id="para-block-1787191394579" blockId="block-1787191394579">This is para  <InlineTooltip tooltip={"Tooltip content"} color={"#F59E0B"} bgColor={"rgba(245, 158, 11, 0.15)"} position={"auto"} maxWidth={400} id={"inlineTooltip-1ce4e095-264d-491e-a589-7f13c55c60bd"}>radius</InlineTooltip></EditableParagraph>
        </Block>
    </StackLayout>,
];
