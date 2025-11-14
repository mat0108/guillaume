import React from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { tableau } from "../../services/tableau";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


type Props = {
  Painting: tableau[];
  frontDiv?: string;
};

const ResponsiveGrid: React.FC<Props> = ({ Painting, frontDiv }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 480: 1, 768: 2, 996: 3, 1200: 4 }}
    >
      <Masonry gutter="16px">
        {Painting.map((tableau) => (
          <div key={tableau._id}>
            <div className={`${frontDiv} flex flex-col p-2 rounded-2xl bg-lightGray`}>
              <img
                src={tableau.imageBase64}
                alt={tableau._id}
                className="w-full object-contain"
              />
              <p className="font-mt-bold mt-2 text-center">{tableau.titre}</p>
            </div>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ResponsiveGrid;
