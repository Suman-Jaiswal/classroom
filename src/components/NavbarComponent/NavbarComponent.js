import React from "react";
import { Link } from 'react-router-dom'
import "./NavbarComponent.scss";
import logo from '../../assets/classroom-svgrepo-com.svg'

export default function NavbarComponent({signOut, user}) {
    return (
        <nav className={'nav-return-wrapper'}>
            <div className="brand-container">
<<<<<<< HEAD
                <img src={logo} alt={'iiti-logo'} />
                <Link to={'/'}>Classroom</Link>
=======
                <img src={logo} alt={'iiti-logo'}/>
                <span>Classroom</span>
>>>>>>> c643dd6a1666143e4239d7589271d29759f8a160
            </div>
            {
                user ? <span> <img src={user.photoURL} alt="" /> <span id='name'>{user.displayName}</span> {
                    user ? <Button variant={'danger'} className='btn-sm' onClick={signOut} > Log Out</Button> : null
                }</span> : null
            }

<<<<<<< HEAD
=======
            {
                user ? <button className={'sign-button'} onClick={signOut}> Log Out</button> : null
            }
>>>>>>> c643dd6a1666143e4239d7589271d29759f8a160


        </nav>
    )
}
