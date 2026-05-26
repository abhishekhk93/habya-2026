import type { ShirtDesign, ShirtSize, ShirtStyle, SizeChartItem } from "./Shop.types";

export const shirtDesigns: ShirtDesign[] = [
    {
        id: "d1",
        name: "Collared Half sleeves",
        type: "COLLARED_HALF",
        frontImage: "/shirts/one-front.png",
        backImage: "/shirts/one-back.png",
        price: 599,
        configKey: "price_shirt_collared_half",
    },
    {
        id: "d2",
        name: "Roundneck Half Sleeves",
        type: "ROUND_NECK_HALF",
        frontImage: "/shirts/two-front.png",
        backImage: "/shirts/two-back.png",
        price: 549,
        configKey: "price_shirt_round_neck_half",
    },
    {
        id: "d3",
        name: "Roundneck Sleeveless",
        type: "ROUND_NECK_SLEEVELESS",
        frontImage: "/shirts/three-front.png",
        backImage: "/shirts/three-back.png",
        price: 499,
        configKey: "price_shirt_round_neck_sleeveless",
    },
    {
        id: "d4",
        name: "High Collared Zip",
        type: "ROUND_NECK_ZIP",
        frontImage: "/shirts/four-front.png",
        backImage: "/shirts/four-back.png",
        price: 499,
        configKey: "price_shirt_round_neck_zip",
    },
];

export const availableSizes: ShirtSize[] = ["S", "M", "L", "XL", "XXL"];
export const availableKidsSizes: ShirtSize[] = ["XS", "2XS", "3XS", "4XS", "5XS", "6XS", "7XS", "8XS", "9XS", "10XS"];
export const availableStyles: ShirtStyle[] = ["Roundneck Sleeveless", "Roundneck Half Sleeves", "Collared Half sleeves"];

export const sizeChart: SizeChartItem[] = [
    { size: "10XS", width: "18", length: "16", sleeve: "6", shoulder: "11.5" },
    { size: "9XS", width: "20", length: "17", sleeve: "6.25", shoulder: "12" },
    { size: "8XS", width: "22", length: "18", sleeve: "6.5", shoulder: "12.5" },
    { size: "7XS", width: "24", length: "19", sleeve: "6.75", shoulder: "13" },
    { size: "6XS", width: "26", length: "20", sleeve: "7", shoulder: "13.5" },
    { size: "5XS", width: "28", length: "21", sleeve: "7.25", shoulder: "14" },
    { size: "4XS", width: "30", length: "22", sleeve: "7.5", shoulder: "14.5" },
    { size: "3XS", width: "32", length: "23", sleeve: "7.75", shoulder: "15" },
    { size: "2XS", width: "34", length: "24", sleeve: "8", shoulder: "15.5" },
    { size: "XS", width: "36", length: "25", sleeve: "8.25", shoulder: "16" },
    { size: "S", width: "38", length: "26", sleeve: "8.5", shoulder: "16.5" },
    { size: "M", width: "40", length: "27", sleeve: "8.75", shoulder: "17" },
    { size: "L", width: "42", length: "28", sleeve: "9", shoulder: "18" },
    { size: "XL", width: "44", length: "29", sleeve: "9.25", shoulder: "18.5" },
    { size: "XXL", width: "46", length: "30", sleeve: "9.5", shoulder: "19" },
];
