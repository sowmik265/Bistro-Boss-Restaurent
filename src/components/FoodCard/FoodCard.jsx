import React from 'react';

const FoodCard = ({item}) => {
    const { name, image, price, recipe } = item;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='bg-slate-900 text-white absolute right-4 mx-4 my-4 px-1'>{price}$</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;