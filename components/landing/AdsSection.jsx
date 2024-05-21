import Image from "next/image";
import CustomLink from "../CustomLink";

const AdsSection = () => {
  return (
    <div className="container pb-16">
      <CustomLink href="/shop">
        <Image
          src="/assets/images/offer.jpg"
          height={1280}
          width={1280}
          alt="ads"
          className="w-full"
        />
      </CustomLink>
    </div>
  );
};

export default AdsSection;
