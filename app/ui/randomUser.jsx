'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaRegUserCircle, FaUserCircle, FaCalendar, FaCalendarAlt, FaLock, FaUnlock } from "react-icons/fa";
import { IoIosMail, IoIosMailOpen } from "react-icons/io";
import { FaMapLocation, FaMapLocationDot, FaPhone, FaPhoneVolume } from "react-icons/fa6";
import { UserSkeleton } from '@/app/ui/skeletons';

const buttons = {
    "name": {
        "quote": "My name is",
        "firstIcon": <FaRegUserCircle />,
        "secondIcon": <FaUserCircle />
    },
    "email": {
        "quote": "My email id is",
        "firstIcon": <IoIosMail />,
        "secondIcon": <IoIosMailOpen />
    },
    "dob": {
        "quote": "My date of birth is",
        "firstIcon": <FaCalendar />,
        "secondIcon": <FaCalendarAlt />
    },
    "location": {
        "quote": "My address is",
        "firstIcon": <FaMapLocation />,
        "secondIcon": <FaMapLocationDot />
    },
    "phone": {
        "quote": "My phone number is",
        "firstIcon": <FaPhone />,
        "secondIcon": <FaPhoneVolume />
    },
    "password": {
        "quote": "My password is",
        "firstIcon": <FaLock />,
        "secondIcon": <FaUnlock />
    }
}

export default function RandomUser() {
    const [displayValue, setDisplayValue] = useState("");
    const [quoteKey, setQuoteKey] = useState("");
    const [user, setUser] = useState({});

    const fetchRandomUser = async () => {
        setUser({});
        const response = await fetch('https://randomuser.me/api/');
        const result = await response.json();
        const userDetails = result.results[0];
        setUser(userDetails);
        setDisplayValue(`${userDetails.name.title}. ${userDetails.name.first} ${userDetails.name.last}`);
        setQuoteKey("name");
    }

    useEffect(() => {
        fetchRandomUser();
    }, []);

    const buttonHandler = (e) => {
        if (!Object.keys(user).length) return;

        const value = e.currentTarget.value;

        switch (value) {
            case 'name':
                setDisplayValue(`${user.name.title}. ${user.name.first} ${user.name.last}`);
                setQuoteKey(value);
                break;

            case 'email':
                setDisplayValue(user[value]);
                setQuoteKey(value);
                break;

            case 'dob':
                const dob = new Date(user[value]["date"]);
                setDisplayValue(`${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()}`);
                setQuoteKey(value);
                break;

            case 'location':
                setDisplayValue(`${user[value]["street"]["number"]}, ${user[value]["street"]["name"]}, ${user[value]["city"]}, ${user[value]["state"]}`);
                setQuoteKey(value);
                break;

            case 'phone':
                setDisplayValue(user[value]);
                setQuoteKey(value);
                break;

            case 'password':
                setDisplayValue(user["login"][value]);
                setQuoteKey(value);
                break;

            default:
                break;
        }
    }

    return (
        <div className='w-full'>
            <div className='m-4 flex flex-col items-center'>
                {
                    Object.keys(user).length ?
                        <>
                            <Image
                                width={128} height={128}
                                src={`${user.picture.large}`}
                                alt={user.name.first}
                                className='peer object-cover ring-1 ring-offset-4 rounded-full -mb-4'
                            />
                            <button
                                className='visible opacity-100 -translate-y-4 sm:invisible sm:opacity-0 sm:translate-y-0 bg-sky-950/90 text-white px-[5px] rounded-sm duration-300 peer-hover:visible peer-hover:opacity-100 peer-hover:-translate-y-4 hover:visible hover:opacity-90 hover:-translate-y-4'
                                onClick={() => fetchRandomUser()}>New</button>

                            <div className='flex flex-col items-center text-center mb-2'>
                                <span>{buttons[quoteKey].quote}</span>
                                <h2 className='font-semibold'>{displayValue}</h2>
                            </div>
                        </>
                        :
                        <UserSkeleton />
                }

                <section className='flex gap-4'>
                    {
                        Object.keys(buttons).map((btn, index) =>
                            <button
                                key={index}
                                className={`button ${quoteKey === btn ? 'active' : ''}`}
                                value={btn}
                                onMouseOver={buttonHandler}
                            >
                                <span>
                                    {buttons[btn].firstIcon}
                                    {buttons[btn].secondIcon}
                                </span>
                            </button>
                        )
                    }

                </section>
            </div>
        </div>
    )
}
