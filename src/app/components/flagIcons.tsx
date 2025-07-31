'use client'

interface CountryFlagProps{
    code : string;
    size ? : number ; // by doing this we mean that if not passed in it will default to 24px
}

export default function CountryFlagIcon({code , size = 24} : CountryFlagProps) {
    return <span className={`fi fi-${code.toLowerCase()}`} style ={{fontSize : `${size}px`}}/>;
}