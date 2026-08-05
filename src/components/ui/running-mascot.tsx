import Image from "next/image";

export function RunningMascot() {
  return (
    <div className="mascot-track" aria-hidden="true">
      <div className="mascot-runner">
        <span className="mascot-shadow" />
        <Image
          src="/mascot-running-animated.png"
          alt=""
          width={512}
          height={256}
          sizes="(max-width: 640px) 88px, 112px"
          className="mascot-image"
          unoptimized
        />
      </div>
    </div>
  );
}
