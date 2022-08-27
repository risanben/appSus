
export function About() {
    return <section className="about">
        <div className="about-container">
            <div className="circle-photo"></div>
            <div className="about-us">
                <h1>Hello,</h1>
                <h3>a bit about us</h3>
                <div className="circle-container">
                    <div className="circle circle1">
                        <div>Nir Shvarchberg</div>
                    </div>
                    <div className="circle circle2">
                        <div>Risan Benichou</div>
                    </div>
                </div>
                <div className="lorem">
                    We built the app as our third project in a seious of projects as part of the Coding Academy course.<br />
                    It is our first big project doing together, which brought a lot of joy throughout the developing stage.<br />
                    We are both hoping the aplication would be useful and easy to operate for all users.<br />
                    If you happen to use our application and would like to send us a review, we would be more than happy to hear
                </div>
            </div>


        </div>
        <footer>
            <div className="footer-container">
                <div><img src="assets/img/icons/letter.png"/><span><h4>contact</h4><br /></span></div>
                <div><img src="assets/img/icons/plus.png"/><span><h4>follow</h4></span><br /></div>
                <div><img src="assets/img/icons/phone.png"/><span><h4>call</h4></span></div>
                <div><img src="assets/img/icons/coppyright.png"/><span><h4>coffeeright</h4></span></div>
            </div>
        </footer>

    </section>
}
