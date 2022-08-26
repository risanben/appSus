const { Route, NavLink } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <div className="home-main-content">
            <h1>Your Most Used Applications,<br />
                But In One Place
            </h1>
            <br />
            <h4>
                Tired Of Switching Between Applications During Your Busy Days? <br />
                We Gathered Them For Your Convinience
            </h4>
            <br />

            <nav>
                <NavLink to="/home/explore">Explore</NavLink>
                <NavLink to="/home/usage">Usage</NavLink>
            </nav>
<br />
            <section>
                <Route path="/home/explore" component={Explore} />
                <Route path="/home/Usage" component={Usage} />
            </section>
        </div>
    </section>
}

function Usage (){
    return <section className="usage-cont">
       
        simply choose your wanted app from the navigation bar on the top left corner.
    </section>
}

function Explore() {
    return <section className="explore-container">
       
        <ul>
            <li>
                <span>MAIL - </span>Email application, enables you to go through your mails with
                ease. Clear interface that will make your browsing experience peacful and enjoyable.
                Send and read Emails, star, delete and manage are some of the features available for you.
            </li>
            <br />
            <li>
            <span>NOTE - </span>google keep inspired, note app is here for you to use whenever you want to keep something in mind.
                An image? todo list or even a voice record? note app has it all.
            </li>
            <br />
            <li>
            <span>BOOK - </span>helps you browse through your favorite books. Inspect a book by review, filter the books or just look for your desired book.
                Enjoy your read!
            </li>
        </ul>
    </section>
}