import { InvitedLogoV2 } from '../assets/icons'
import HomeAction from '../components/HomeAction';

const HomePage = () => {
    
  return (
    <div className='home-wrapper'>
        <div className="container">
            <div className="row">
                <div className="welcome-banner col-md-6">
                    <h1>Welcome to</h1>
                    <h1 id='invited-banner'>Invited</h1>
                    <p>A privacy focused Virtual Meeting platform from Brahmware</p>
                </div>
                <div className="welcome-picture col-md-6">
                    <InvitedLogoV2/>
                </div>
            </div>
        </div>
        <div className="container">
            <HomeAction />
        </div>
    </div>
  )
}

export default HomePage