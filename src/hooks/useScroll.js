import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../context";




export default function useScroll(lastElement, callback) {
    const observer = useRef()
    const {isLoading} = useContext(Context)
    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        var cb = function([target]) {
            if(target.isIntersecting) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(lastElement.current)
    }, [callback])
}