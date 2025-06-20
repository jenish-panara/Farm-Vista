import './footer.css'
import footerimage from '../img/footerimage.webp'
import fi1 from '../img/fi1.webp'
import fi2 from '../img/fi2.webp'
import fi3 from '../img/fi3.png'
import fi4 from '../img/fi4.svg'
function Footer(){
    return(
        <>
                <div className="footer-container">
                    <div className="contact">
                        <h3>Contact us</h3>
                        <p><strong>Vanspati Farms Post Harvest Care Limited</strong></p>
                        <p>Registered Office and Factory:</p>
                        <p>Gat No 314/1, 314/2/1, A/p Mohadi, Taluka Dindori,<br/>
                        District Nashik, Maharashtra 422207, India</p>
                        <p>CIN - U01111MH2020PLC344170</p>
                        <p>Phone: <a href="tel:1800212002020">1800 212 002 020</a></p>
                        <p>Email: <a href="mailto:info@sahyadrifarms.com">info@Vanspatifarms.com</a></p>
                    </div>
                    
                    <div className="links">
                        <h3>Featured links</h3>
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Meet our Chairman</a></li>
                            <li><a href="#">Food Safety Standards</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Investors</a></li>
                            <li><a href="#"><img src={fi3} className="fimg" /></a></li>
                        </ul>
                    </div>
                    
                    <div className="help">
                        <h3>Help</h3>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                        </ul>
                    </div>
                    
                    <div className="app">
                        <h3>Farmer App</h3>
                        <a href="#"><img src={fi1} style={{marginLeft:'120px',width:'110px',height:'30px'}} alt="Get it on Google Play"/></a>
                        <a href="#"><img src={fi2} style={{marginLeft:'120px',width:'110px',height:'30px'}} alt="Download on the App Store"/></a>
                        <a href="#"><img src={fi4} style={{marginLeft:'120px',width:'110px',height:'30px'}} alt="SetuVerified"/></a>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>© Vanspati Farms Post Harvest Care Ltd.</p>
                    <p>FarmSetu Supply Chain Stack</p>
                </div>

                <img src={footerimage} style={{width:'100%',height:'200px'}} />
        </>
    )
}

export default Footer