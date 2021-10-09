import imgSrc from "@/assets/loading.svg";
import styles from "./loading.module.css"

function getLoadingImage(el) {
    return el.querySelector("img[data-role=loading]");
}

export default function (el, binding) {
    const curImg = getLoadingImage(el);
    
    if (binding.value) {
        if (!curImg) {
            const img = document.createElement("img");
            img.dataset.role = "loading";
            img.src = imgSrc;
            img.className = styles.loading;
            el.appendChild(img);
        }
    }else{
        if(curImg){
            curImg.remove();
        }
    }
}