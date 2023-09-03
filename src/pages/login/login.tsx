import {
    LoginSocialGoogle,
    IResolveParams,
    objectType,
} from 'reactjs-social-login'

import {
    GoogleLoginButton,
} from 'react-social-login-buttons'

import { useNavigate } from 'react-router-dom'
import { LoginRealTimeService } from './ioc/loginrealtimeservice'
import { LoginService } from './ioc/iloginservice'
const _service = new LoginRealTimeService()
const service = new LoginService(_service)



//const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = "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"

const LoginScreen: React.FC = () => {
    const navigate = useNavigate()

    const handleDataLogin = async (data: objectType | undefined) => {
        const { ...rest } = data
        console.log('rest', rest)
        const { name, picture, email, locale, email_verified, sub } = rest
        console.log({ name, picture, email, locale, email_verified, sub })
        if (email_verified) {
            localStorage.setItem('name', name)
            localStorage.setItem('isVerify', email_verified)
            localStorage.setItem('lord', sub)
            localStorage.setItem('email', email)

            try {
                await service.AddOrUpdateuser({
                    name,
                    picture,
                    email,
                    locale,
                    sub,
                    stack: 5000,
                    position: '',
                    action: '',
                    bet: 0,
                    card1: '0',
                    card2: '0'

                })
                navigate('/home/mesas')
            } catch (e) {
                throw e
            }

        }
    }

    return (<main className='h-screen bg-green-950'>
        <div id="main" className='flex h-screen items-center justify-center border-r-red-500'>

            <div className='p-4 border-2 h-1/2 flex items-center justify-center rounded-[5rem]'>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-center mb-10'>
                        <img
                            src="/LOGO.png"
                            alt="Imagem"
                            width="167"
                            height="137"
                        />
                    </div>


                    <h1 className="title p-4 text-white font-bold">Faça o login com a rede social da sua preferência</h1>
                    <LoginSocialGoogle
                        client_id={"805698521565-rhqp73qq4ffgc8e748glea2lj9b30aa2.apps.googleusercontent.com"}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="online"
                        onResolve={async ({ data }: IResolveParams) => {
                            handleDataLogin(data)
                        }}

                        onReject={(err: any) => {
                            console.log(err)
                        }}
                    >
                        <GoogleLoginButton text='Login com o Google' />
                    </LoginSocialGoogle>
                </div>

            </div>

        </div>


    </main>)
}

export default LoginScreen