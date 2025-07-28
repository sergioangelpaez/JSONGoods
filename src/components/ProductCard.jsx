//https://1.bp.blogspot.com/-ObhS2Lq65GI/YLzGkqvTqiI/AAAAAAAAASs/006Ay3kOU5sCrjezXyjyrm67l3E8zUd6QCLcBGAsYHQ/s1280/animated%2Bproduct%2Bcard%2B%25281%2529.jpg

const ProductCard = () => {
    return (
        <div className="bg-white shadow-lg rounded-md border border-light-border px-3 py-5 flex flex-col gap-3">
            {/* Imagen con chip encima */}
            <div className="w-full aspect-[4/3] relative overflow-hidden rounded-md">
                <img
                    src=""
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Product"
                />
                {/* Chip de categoría */}
                <div className="absolute top-2 left-2 bg-accent rounded-md px-2 py-1 text-white text-xs">
                    <p>Category</p>
                </div>
            </div>

            {/* Contenido del producto */}
            <div>
                <h1 className="text-base font-semibold">Product Title</h1>
            </div>
            <div>
                <p className="text-sm text-gray-600">Product description goes here and it will be long as fuck.</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Rating: 0/0</p>
            </div>
            <div>
                <p className="text-lg font-bold text-green-600">$123.45</p>
            </div>
            <div>
                <button className="mt-2 w-full bg-accent text-white py-2 rounded-md text-sm hover:opacity-90 transition">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;