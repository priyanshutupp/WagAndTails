import { cow1 } from "../assets";
import styles, { layout } from "../style";

const WhyUs = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        What We Offer
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Wag and Tails provides a wide range of pet care services tailored to meet the unique needs of your pets. 
        From daily walks to professional grooming and a well-stocked pet food marketplace, 
        we have everything to keep your pets happy and healthy.
      </p>
      <ul className={`${styles.paragraph} max-w-[470px] mt-5 list-disc ml-5`}>
        <li>Our experienced caretakers are dedicated to providing the highest quality of pet care services.</li>
        <li>We offer 24/7 support to ensure your pets' well-being at all times.</li>
        <li>Our pet food marketplace offers only genuine, high-quality products to meet the dietary needs of all pets.</li>
      </ul>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>  
        Choose Wag and Tails for reliable and compassionate pet care services backed by years of experience 
        and a passion for animals. Your pets will be in the safest hands, enjoying personalized attention and care.
      </p>
    </div>

    <div className={layout.sectionImg}>
      <div class="relative order-first md:order-last md:w-2/5 lg:w-1/2">
        <div class="relative z-20 mx-auto h-96 w-full rounded-xl border-4 border-white lg:h-[490px] lg:w-[450px]">
              <img class="high-res-image relative z-10 h-full w-full rounded-xl object-cover" src={cow1} oncontextmenu="return false;"/>
              <p id="text-over-image" class="absolute bottom-9 left-9 z-20 text-3xl font-semibold text-white lg:text-4xl xl:text-5xl">Why Us</p>
        </div>
        <div class="primary-color-bg primary-opacity-[20] absolute left-0 top-10 z-0 h-96 w-96 rounded-full blur-3xl md:top-0 md:h-[600px] md:w-[600px] bg-yellow-400/20"></div>
      </div>
    </div>
  </section>
);

export default WhyUs;
