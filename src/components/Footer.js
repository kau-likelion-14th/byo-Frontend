import '../styles/Footer.css';
import logo from '../assets/image/logo.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <img src={logo} alt='LTE' className='footer-logo'/>
                    <div className='footer-title'>
                        <strong>Lion To-do Everyday</strong>
                    </div>
            </div>
            <span>LTE는 멋쟁이 사자처럼에서 개발한 투두 관리 기반의 웹 서비스입니다.</span>

            <div className="footer-info-container">
                <div className="info-row">
                    <span className="info-item">상호명 : 멋쟁이사자처럼</span>
                    <span className="info-item">대표자 : 전유민</span>
                    <span className="info-item">주소 : 경기도 고양시 항공대학로 76 항공우주센터 3층 창업카페</span>
                </div>
                <div className="info-row">
                    <span className="info-item">사업자등록번호 : 333-22-55555</span>
                    <span className="info-item">개인정보보호책임자 : 전유민</span>
                    <span className="info-item">이메일 : kimyena@naver.com</span>
                    <span className="info-item">전화번호 : 010-4276-4930</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;