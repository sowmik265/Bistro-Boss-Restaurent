import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle subHeading={'check it out'} heading={'featured Item'}></SectionTitle>
            <div className='md:flex items-center justify-center pb-20 pt-12 px-36 bg-slate-500 bg-opacity-40'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2023</p>
                    <p className='uppercase'>where can i get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, veniam accusamus blanditiis alias repudiandae fuga eveniet, sequi deleniti exercitationem quos ex id? Voluptas temporibus quidem blanditiis aperiam deserunt optio ut magni et inventore necessitatibus. Laborum nulla ad optio ducimus voluptas tenetur odit magni aspernatur pariatur autem? Laudantium reiciendis magni maxime.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Button</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;