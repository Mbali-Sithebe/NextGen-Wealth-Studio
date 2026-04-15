import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Navigation />

            <div className="content-wrapper">
                <main className="page-content">
                    {children}
                </main>

                <Footer /> {/* footer */}
            </div>
        </div>
    );
}