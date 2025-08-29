// The shape of the images object
export type Images = {
    walkUp: UploadedImage[];
    walkDown: UploadedImage[];
    walkLeft: UploadedImage[];
    walkRight: UploadedImage[];
    stand: UploadedImage[];
    dying: UploadedImage[];
    attack: UploadedImage[];
    health: UploadedImage[];
    avatar: UploadedImage[];
};

// Category is just the keys of Images
export type Category = keyof Images;

// Uploaded image
export type UploadedImage = {
    file: File;
    delay: number;
    category: Category;
    width: number;
    height: number;
    rgbaData: number[]; // RGBA pixel values
};