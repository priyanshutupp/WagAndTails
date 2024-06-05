import { cat1, dog2 } from "../assets";
import  styles, { layout } from "../style";

const AboutUs = () => (
  <section id="aboutUs" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <div class="relative col-span-3 ml-8 grid grid-cols-3 gap-4 pb-10 md:ml-0 md:grid-cols-2 lg:gap-8 xl:col-span-1">
          <div class="relative z-30 col-span-2 h-60 w-full overflow-hidden rounded-xl border-4 border-white shadow-[0_0_25px_0_rgba(0,0,0,0.1)] md:col-span-1 md:h-96 lg:h-[460px]">
              <img class="high-res-image h-full w-full object-cover" src={cat1} oncontextmenu="return false;"/>
          </div>
          <div class="relative z-10 h-60 w-full overflow-hidden rounded-xl rounded-r-none border-4 border-white md:h-96 md:rounded-r-xl lg:h-[460px]">
              <img class="high-res-image h-full w-full object-cover" src={dog2} oncontextmenu="return false;"/>
          </div>
          <div class="primary-color-border absolute -bottom-4 left-32 z-20 hidden h-[300px] w-[300px] rounded-full border-[40px] shadow-[0_0_25px_0_rgba(0,0,0,0.1)] lg:block border-yellow-400"></div>
          <div class="primary-color-border absolute bottom-0 left-32 z-20 h-[200px] w-[200px] rounded-full border-[30px] shadow-[0_0_25px_0_rgba(0,0,0,0.1)] lg:hidden border-yellow-400"></div>
      </div>
      
      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={`${layout.sectionInfo} ml-8`}>
      <h2 className={styles.heading2}>
        About Us
      </h2>
      <p className={`${styles.paragraph} max-w-[500px] mt-5`}>
        Wag and Tails is dedicated to providing top-notch pet services that include pet sitting,
        dog walking, grooming, and an assortment of genuine pet food. With our team of experienced caretakers and 24/7 support,
        we ensure your pets receive the best care possible.
      </p>
    </div>
  </section>
);

export default AboutUs;
