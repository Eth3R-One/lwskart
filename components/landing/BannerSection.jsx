import CustomLink from "../CustomLink";

const BannerSection = ({ dictionary }) => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-36"
      style={{ backgroundImage: 'url("assets/images/banner-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize whitespace-pre-wrap">
          {dictionary.bannerHeading} <br />
          {dictionary.bannerTitle}
        </h1>
        <p>{dictionary.lorem}</p>
        <div className="mt-12">
          <CustomLink
            href="/shop"
            className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary"
          >
            {dictionary.shopNow}
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
