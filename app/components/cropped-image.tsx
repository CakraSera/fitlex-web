import { forwardRef } from "react";
import { cn } from "~/lib/utils";

interface CroppedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  cropPosition?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  className?: string;
}

const CroppedImage = forwardRef<HTMLImageElement, CroppedImageProps>(
  (
    { width = 600, height = 600, cropPosition = "center", className, ...props },
    ref
  ) => {
    const cropClasses = {
      center: "object-center",
      top: "object-top",
      bottom: "object-bottom",
      left: "object-left",
      right: "object-right",
      "top-left": "object-top object-left",
      "top-right": "object-top object-right",
      "bottom-left": "object-bottom object-left",
      "bottom-right": "object-bottom object-right",
    };

    // Calculate aspect ratio for responsive design
    const aspectRatio = width / height;
    const aspectRatioClass =
      aspectRatio === 1 ? "aspect-square" : `aspect-[${width}/${height}]`;

    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl shadow-2xl",
          aspectRatioClass,
          className
        )}>
        <img
          ref={ref}
          className={cn(
            "w-full h-full object-cover",
            cropClasses[cropPosition]
          )}
          {...props}
        />
      </div>
    );
  }
);

CroppedImage.displayName = "CroppedImage";

export { CroppedImage };
