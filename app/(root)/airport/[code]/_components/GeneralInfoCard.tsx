import React from "react";
import Image, { StaticImageData } from "next/image";

interface GeneralInfoCardProps {
  backgroundImageSrc: string;
  iconSrc: StaticImageData | string;
  title: string;
  items: Array<{
    label: string;
    value: string | null | undefined;
    show?: boolean;
  }>;
}

const GeneralInfoCard: React.FC<GeneralInfoCardProps> = ({
  backgroundImageSrc,
  iconSrc,
  title,
  items,
}) => {
  return (
    <div className="flex relative w-full justify-between p-3 gap-2 border border-gray-400 rounded">
      <div
        className="absolute right-0 opacity-40 top-0 bottom-0 w-1/2 bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
        }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full bg-gradient-to-b from-[#3F495F] to-[#0E1934] opacity-70 z-[-1]" />

      <div className="flex flex-col justify-between p-1">
        <div className="flex items-center gap-2 mb-5">
          <Image src={iconSrc} alt="tab icon" width={20} height={20} />
          <h1 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500 bg-clip-text">
            {title}
          </h1>
        </div>

        <div className="flex flex-col">
          {items.map(
            (item, index) =>
              // Only render items where show is not explicitly set to false
              item.show !== false && (
                <div key={index} className="flex items-center mb-2">
                  <p className="text-sm text-white/90">
                    <strong className="font-bold">{item.label}: </strong>{" "}
                    {item.value || "No disponible"}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoCard;
