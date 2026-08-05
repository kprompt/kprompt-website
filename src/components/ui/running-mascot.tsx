import Image from "next/image";

export function RunningMascot() {
  return (
    <div className="mascot-track" aria-hidden="true">
      <div className="mascot-runner">
        <span className="mascot-shadow" />
        <Image
          src="/mascot-running.png"
          alt=""
          width={1329}
          height={587}
          sizes="(max-width: 640px) 88px, 112px"
          className="mascot-image"
        />
      </div>
    </div>
  );
}
