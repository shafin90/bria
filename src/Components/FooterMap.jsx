import React from "react";
import "./FooterMap.css";

const FooterMap = () => {
  return (
    <div className="footerMap">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3863.871120055863!2d79.97318407510305!3d14.434589986032307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDI2JzA0LjUiTiA3OcKwNTgnMzIuNyJF!5e0!3m2!1sen!2sin!4v1719732430733!5m2!1sen!2sin"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default FooterMap;
