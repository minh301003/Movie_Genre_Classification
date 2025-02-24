import IconRating from "../assets/rating.png";
import IconRatingHalf from "../assets/rating-half.png";
import ImgTemp from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
  return (
    <div className="w-full h-[600px] bg-banner bg-center bg-no-repeat bg-cover relative">
      <div className="absolute w-full h-full top-0
      left-0 bg-black opacity-40" />
      <div className="w-full h-full flex items-center
      justify-center space-x-[30px]
      p-4 relative z-20">
        <div className="flex flex-col space-y-5 items-baseline w-[50%]">
          <p className="text-white bg-gradient-to-r from-red-600 to-red-300 text-md py-2 px-3">
            Teen Adventure
          </p>
          <div className="flex flex-col space-y-4">
            <h2 className="text-white text-[40px]
            font-bold">How to Train Your Dragon</h2>
            <div className="flex items-center space-x-3">
              <img src={IconRating} alt="rating"
              className="w-8 h-8" />
              <img src={IconRating} alt="rating"
              className="w-8 h-8" />
              <img src={IconRating} alt="rating"
              className="w-8 h-8" />
              <img src={IconRating} alt="rating"
              className="w-8 h-8" />
              <img src={IconRatingHalf} alt="rating"
              className="w-8 h-8" />
            </div>
            <p className="text-white">Follows a young Viking as he aspires to hunt dragons, and how he becomes unexpectedly a friend of a young dragon.</p>
            <div className="flex item-center space-x-4">
              <button className="p-2 text-white bg-black font-bold text-sm">
                Detail
              </button>
              <button className="p-2 text-white bg-red-600 font-bold text-sm">
                Watch Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group cursor-pointer">
            <img
              src={ImgTemp}
              alt="temp"
              className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-30"  // Thêm hiệu ứng opacity cho ảnh khi hover
            />
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <img
                src={IconPlay}
                alt="play"
                className="w-16 h-16 z-20"  // Đảm bảo icon play có kích thước đúng và z-index cao hơn
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;