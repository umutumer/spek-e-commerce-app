import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <form className='w-96 h-96 flex flex-col items-center justify-center border border-orange-500 shadow-lg shadow-orange-400 rounded relative'>
            <h3 className='m-2 text-2xl font-medium text-orange-500'>SPEK E COMMERCE GİRİŞ YAP</h3>
            <input type="text" placeholder='kullanıcı adı' className='w-[90%] m-2 p-2 rounded border border-orange-500 focus:outline-none focus:border-2 focus:border-orange-500 focus:ring-orange-500'/>
            <input type="password" placeholder='******' className='w-[90%] m-2 p-2 rounded border border-orange-500 focus:outline-none focus:border-2 focus:border-orange-500 '/>
            <input type="submit" value={"Giriş Yap"} className='w-[90%] m-2 p-2 rounded text-white bg-orange-500' />
            <div className='absolute bottom-2 right-2 flex'>
                <p className='mr-2 text-gray-400'>Hesabınız mı yok ?</p> <Link to='/register' className='border-b border-black'>Kayıt Olun</Link>
            </div>
        </form>
    </div>
  )
}

export default Login