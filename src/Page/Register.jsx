import React from 'react'

const Register = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <form className='w-96 h-96 flex flex-col items-center justify-center border border-orange-500 shadow-lg shadow-orange-400 rounded relative'>
            <h3 className='m-2 text-2xl font-medium text-orange-500'>SPEK E COMMERCE KAYIT OL</h3>
            <input type="text" placeholder='kullanıcı adı' className='w-[90%] m-2 p-2 rounded border border-orange-500 focus:outline-none focus:border-2 focus:border-orange-500 focus:ring-orange-500'/>
            <input type="text" placeholder='e-posta' className='w-[90%] m-2 p-2 rounded border border-orange-500 focus:outline-none focus:border-2 focus:border-orange-500 focus:ring-orange-500'/>
            <input type="password" placeholder='şifre' className='w-[90%] m-2 p-2 rounded border border-orange-500 focus:outline-none focus:border-2 focus:border-orange-500 '/>
            <input type="password" placeholder='şifre tekrar' className='w-[90%] m-2 p-2 rounded border border-orange-500 focus:outline-none focus:border-2 focus:border-orange-500 '/>
            <input type="submit" value={"Kayıt Ol"} className='w-[90%] m-2 p-2 rounded text-white bg-orange-500' />
        </form>
    </div>
  )
}

export default Register