import styles from "../style";
import { AboutUs, Services, WhyUs, CTA, Footer, Hero } from "../components";
import { useAuth } from '../context/AuthContext';

const About = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <AboutUs />
          <Services />
          <WhyUs />
          {!user && <CTA />}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default About; 