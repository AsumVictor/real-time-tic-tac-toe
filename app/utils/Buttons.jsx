import Link from "next/link";
import IconRestart from "./IconRestart";

const colorClasses = {
  btnGreen: "bg-[var(--primary-green)]",
  btnYellow: "bg-[var(--primary-yellow)]",
  btnRestart: "bg-[var(--menu-restart-color)]",
};

const hoverColorClasses = {
  btnGreen: "hover:bg-[var(--hover-green)]",
  btnYellow: "hover:bg-[var(--hover-yellow)]",
};

const backgroundColorClasses = {
  btnGreen: "bg-[var(--background-green)]",
  btnYellow: "bg-[var(--background-yellow)]",
  btnRestart: "bg-[var(--menu-restart-bg-shadow-color)]",
};

const buttonClass = {
  primaryButton:
    "w-full border-0 cursor-pointer relative z-10 h-[var(--mobile-pb-height)] sm:h-[var(--tablet-pb-height)] md:h-[var(--desktop-pb-height)] rounded-[var(--pb-radius)] ",
  shadowButton: "absolute top-2 w-full h-full rounded-[var(--pb-radius)]  z-0",
};

export const PrimaryButton = ({
  player = "X",
  btnText = "Click me",
  color = "btnGreen",
}) => {
  return (
    <Link
      href={player === "X" ? "/board?player=x" : "/board?player=o"}
      className={`relative ${buttonClass["primaryButton"]} block`}>
      <button
        className={`transition-all duration-300 ease-in  ${colorClasses[color]} ${hoverColorClasses[color]} ${buttonClass["primaryButton"]}`}>
        <span className=" font-bold text-md sm:text-xl">{btnText}</span>
      </button>
      <div
        className={`${buttonClass["shadowButton"]}  ${backgroundColorClasses[color]}`}></div>
    </Link>
  );
};

export const RestartButton = ({ reset }) => {
  return (
    <div className="relative">
      <button
        onClick={() => {
          reset();
        }}
        className="z-10 bg-[var(--menu-restart-color)] h-10 w-10 flex items-center justify-center rounded-lg">
        <IconRestart />
      </button>
      <div className="h-10 w-10 rounded-lg bg-[var(--menu-restart-bg-shadow-color)] absolute top-1 -z-10"></div>
    </div>
  );
};

export const QuitButton = ({
  closeModal,
  color = "btnRestart",
  text = "QUIT",
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => {
          closeModal();
        }}
        className={`z-10 ${colorClasses[color]} h-10 flex items-center justify-center rounded-lg px-2 font-bold`}>
        {text}
      </button>
      <div
        className={`h-10 w-full rounded-lg ${backgroundColorClasses[color]} absolute top-1 -z-10`}></div>
    </div>
  );
};
