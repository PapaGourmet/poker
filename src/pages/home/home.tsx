import { Outlet } from "react-router-dom"
import HeaderScreen from "./header/header"

const HomeScreen: React.FC = () => {
    return (
        <main>
            <HeaderScreen></HeaderScreen>
            <div className="m-10">
                <Outlet />
            </div>
        </main>
    )
}


export default HomeScreen