import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { PulseLoader } from "./PulseLoader";

interface PulseImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export function PulseImage({ className, containerClassName, onLoad, onError, ...props }: PulseImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(imageRef.current?.complete ?? false);
  }, [props.src]);

  return (
    <div className={cn("relative", containerClassName)}>
      {!loaded && <PulseLoader className="absolute inset-0 z-10 bg-white/20" label={`Loading ${props.alt || "image"}`} />}
      <img
        {...props}
        ref={imageRef}
        className={cn("transition-opacity duration-200", loaded ? "opacity-100" : "opacity-0", className)}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
      />
    </div>
  );
}
