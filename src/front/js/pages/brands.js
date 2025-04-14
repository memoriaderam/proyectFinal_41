import React, { useContext } from "react";
import { Context } from "../store/appContext";

import Ray from "../../img/1.jpg";
import Oakley from "../../img/2.jpg";
import Polaroid from "../../img/3.jpg";
import Carrera from "../../img/4.jpg";
import Arnette from "../../img/5.jpg";
import Tous from "../../img/6.jpg";
import Police from "../../img/7.jpg";
import Carolina from "../../img/8.jpg";
import Vogue from "../../img/9.jpg";
import Persol from "../../img/10.jpg";
import Prada from "../../img/11.jpg";
import Ford from "../../img/12.jpg";
import Adidas from "../../img/13.jpg";
import Dior from "../../img/14.jpg";
import Lacoste from "../../img/15.jpg";
import Hugo from "../../img/16.jpg";
import Timberland from "../../img/17.jpg";
import Munich from "../../img/18.jpg";
import Trend from "../../img/19.jpg";
import be from "../../img/20.jpg";
import "../../styles/home.css";

export const Brands = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid border text-center">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="row row-cols-4">
        <div className="col-12">
          <h1>Marcas</h1>
        </div>
      </div>

      <br></br>

      <div className="row row-cols-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body justify">
              <h2 className="card-title"></h2>
              <p className="card-text">
                Aca en Mundo optico podras escojer la marca que más te guste con
                tu formula, aca podras tener los lentes más in del momento. trae
                para ti gran variedad de monturas en tendencia, tanto de casas
                de diseño internacional reconocidas, como sus marcas propias
                realizadas bajo los más altos estándares de excelencia. Todas
                nuestras monturas son 100% originales y certificadas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <br></br>

      <br></br>
      <br></br>
      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>1. Gafas de sol Ray-Ban</h4> <br></br>
          <br></br>
          Si buscas una marca de gafas clásica, Ray-Ban se encuentra entre las
          mejores marcas de gafas de sol y, sin duda, es una elección perfecta
          para ti. Su nombre significa “barrera para los rayos” y la verdad es
          que no podría describir mejor lo que ofrece. En su catálogo tienes
          modelos en tendencia, pero también gafas atemporales que sabes que
          podrás usar durante años. Uno de los diseños clásicos de Ray-Ban son
          las gafas de sol de aviador.<br></br> <br></br>
        </div>
        <div className="col-6">
          <img
            src={Ray}
            className="card-img-top"
            alt="..."
            width="380"
            height="380"
          />
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>2. Gafas de sol Oakley</h4> <br></br>
          <br></br>
          Oakley es una marca de gafas con un diseño mucho más deportivo. Pero
          no solo su estética es perfecta para este propósito: sus lentes
          cuentan con tecnologías que las han hecho merecedoras de hacerse un
          hueco ni más ni menos que en el Tour de Francia. No obstante, si
          buscas gafas de sol para uso diario, no te preocupes porque la marca
          ofrece desde los años 90 productos para el gran público.<br></br>{" "}
          <br></br>
        </div>
        <div className="col-6">
          <img
            src={Oakley}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>3. Gafas de sol Polaroid</h4> <br></br>
          <br></br>
          Polaroid es una de las mejores marcas de gafas de sol en cuanto a
          gafas de sol polarizadas, y es que fue su fundador el que inventó este
          tipo de lente. Sin duda, se trata de una firma innovadora que te
          aporta siempre la mejor calidad en sus productos.
        </div>
        <div className="col-6">
          <img
            src={Polaroid}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>4. Gafas de sol Carrera</h4> <br></br>
          <br></br>
          Carrera empezó su trayectoria décadas atrás, allá por el año 1956, y
          desde entonces ha sido una marca de gafas desafiante y rompedora que
          ha logrado posicionarse entre las mejores marcas de gafas de sol.
          Encontrarás en su catálogo gafas diferentes, que te darán un aire
          distintivo.
        </div>
        <div className="col-6">
          <img
            src={Carrera}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>5. Gafas de sol Arnette</h4> <br></br>
          <br></br>
          Fundada en 1992, Arnette es una marca de la época de los millenials,
          joven y moderna. La firma ofrece gafas de sol perfectas para gente con
          un estilo desenfadado y urbano.
        </div>
        <div className="col-6">
          <img
            src={Arnette}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>6. Gafas de sol Tous</h4> <br></br>
          <br></br>
          La marca Tous, fundada en 1920, es conocida por su presencia en el
          sector de la joyería y los accesorios que ha ido lanzando
          posteriormente. Entre ellos encuentras una amplia variedad de gafas de
          sol, todas ellas de alta gama y con diseños elegantes. Su símbolo, el
          popular oso de Tous, está presente en los diferentes modelos, dándoles
          un toque distintivo.
        </div>
        <div className="col-6">
          <img
            src={Tous}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>7. Gafas de sol Police</h4> <br></br>
          <br></br>
          La marca italiana Police fue lanzada en el año 1983, y ya desde un
          inicio las gafas de sol eran su especialidad. Han sido imagen de la
          firma personajes importantes como George Clooney y David Beckham, que
          destacan por su estilo. En nuestro catálogo encontrarás los diseños
          que te harán estar siempre a la vanguardia de la moda y lucir una de
          las mejores marcas de gafas de sol.
        </div>
        <div className="col-6">
          <img
            src={Police}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>8. Gafas de sol Carolina Herrera</h4> <br></br>
          <br></br>
          La relevante firma de moda Carolina Herrera te trae una amplia gama de
          gafas de sol elaboradas con los mejores materiales. Siguiendo formas
          clásicas, esta marca ha ido reinventándose hasta posicionarse entre
          una de las mejores marcas de gafas de sol, logrando unos modelos
          elegantes y sofisticados que encontrarás en nuestro catálogo.
        </div>
        <div className="col-6">
          <img
            src={Carolina}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>9. Gafas de sol Vogue</h4> <br></br>
          <br></br>
          Seguro que la marca Vogue se ha quedado grabada en tu mente, siempre
          asociada a tendencia y últimas modas. No es para menos, y es que esta
          firma destaca por estar siempre a la última. Tanto es así que incluso
          cuenta con una colección con una de las modelos del momento: Gigi
          Hadid.
        </div>
        <div className="col-6">
          <img
            src={Vogue}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>10. Gafas de sol Persol</h4> <br></br>
          <br></br>
          La firma italiana Persol cuenta con una gran trayectoria en su haber,
          y es que nació hace ya más de un siglo, en 1917. En su inicio
          empezaron a fabricarse gafas para conductores deportivos y pilotos.
          Más tarde las gafas Persol salieron en la gran pantalla de la mano de
          actores como Steve McQueen. La firma ha sabido aprovechar estos
          potentes orígenes y convertirse en una de las mejores marcas de gafas
          de sol, reinventándose hasta ofrecerte los diseños icónicos que
          encontrarás ahora.
        </div>
        <div className="col-6">
          <img
            src={Persol}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>11. Gafas de sol Prada</h4> <br></br>
          <br></br>
          Prada ofrece mucho más que ropa, y es que una firma icónica en el
          mundo de la moda no podía dejar de lado la oportunidad de ser una de
          las mejores marcas de gafas de sol. Sus modelos destacan por la
          creatividad y la modernidad, que se dan la mano con el lujo en una
          selección impecable.
        </div>
        <div className="col-6">
          <img
            src={Prada}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>12. Gafas de sol Tom Ford</h4> <br></br>
          <br></br>
          Si buscas lujo y exclusividad, Tom Ford es una las mejores marcas de
          gafas de sol para ti. Pone su sello en todos los modelos. No lo hace
          con diseños rocambolescos, sino poniendo atención a todos los detalles
          y empleando los mejores materiales. Elegancia y glamour se unen en la
          selección de las mejores marcas de gafas de sol que encontrarás.
        </div>
        <div className="col-6">
          <img
            src={Ford}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>13. Gafas de sol Adidas</h4> <br></br>
          <br></br>
          Si buscas protección y comodidad para hacer deporte, Adidas es una de
          las mejores marcas de gafas de sol que deberías considerar. Te ofrece
          modelos con un estilo sport y adaptados perfectamente para varias
          actividades como esquí, ciclismo o running.
        </div>
        <div className="col-6">
          <img
            src={Adidas}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>14. Gafas de sol Dior</h4> <br></br>
          <br></br>
          La elegancia francesa es el sello distintivo de las gafas de sol Dior,
          y se une muchas veces con un estilo vintage, lo que convierte a la
          marca francesa en una de las mejores marcas de gafas de sol.
          Elaborados con materiales innovadores, los modelos mantienen la línea
          creativa que nos legó Christian Dior. Modernidad y glamour es lo que
          caracteriza a todos los diseños.
        </div>
        <div className="col-6">
          <img
            src={Dior}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>15. Gafas de sol Lacoste</h4> <br></br>
          <br></br>
          Lacoste fue creada por el tenista francés René Lacoste, que lanzó las
          primeras gafas de sol en la década de los 80. Las líneas rectangulares
          y los diseños informales son su sello de identidad, así como el
          símbolo del cocodrilo, ampliamente conocido.
        </div>
        <div className="col-6">
          <img
            src={Lacoste}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>16. Gafas de sol Hugo Boss</h4> <br></br>
          <br></br>
          Sofisticación y elegancia sin renunciar a la comodidad y la
          funcionalidad. Eso es lo que te prometen las gafas de sol de la marca
          Hugo Boss. Sus diseños son clásicos y tienen un estilo definido, a la
          vez que presentan detalles cuidados y elaborados. Si esto es lo que
          buscas, la firma alemana resultará una de las mejores marcas de gafas
          de sol para ti.
        </div>
        <div className="col-6">
          <img
            src={Hugo}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>17. Gafas de sol Timberland</h4> <br></br>
          <br></br>
          Timberland es una marca que, más allá de cuidar los diseños, se
          preocupa por que todos los materiales sean ligeros y flexibles. Vela
          por la resistencia y la comodidad de sus modelos. A esto se le añade
          su compromiso con el medio ambiente y el entorno, un punto que sin
          duda va a favor de la firma y que ha hecho que muchos usuarios la
          consideren de las mejores marcas de gafas de sol.
        </div>
        <div className="col-6">
          <img
            src={Timberland}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>18. Gafas de sol Munich</h4> <br></br>
          <br></br>
          La trayectoria de la firma Munich empieza en el año 1939 y en el
          sector del calzado. Es más tarde cuando la marca decide extender su
          producción a otros ámbitos, incluyendo accesorios como las gafas de
          sol. El éxito fue rotundo, pues consiguió trasladar su saber hacer a
          los diseños. Por eso te recomendamos Munich como una de las mejores
          marcas de gafas sol.
        </div>
        <div className="col-6">
          <img
            src={Munich}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>19. Gafas de sol Trend</h4> <br></br>
          <br></br>
          Nuestra marca propia Trend es una opción económica para personas
          jóvenes y deportivas. Para los que buscan unas gafas de sol urbanas y
          modernas puede ser de las mejores marcas de gafas de sol. Además,
          tienes una amplia variedad de lentes y monturas para elegir.
        </div>
        <div className="col-6">
          <img
            src={Trend}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          <h4>20. Gafas de sol beO</h4> <br></br>
          <br></br>
          Con un diseño actual y funcional, nuestra marca beO pone a tu
          disposición gafas de sol a un precio asequible. Puedes elegir entre
          diferentes colores y formas, entre modelos más clásicos y otros más
          atrevidos. Una opción perfecta para ti si buscas gafas de calidad a
          buen precio.
        </div>
        <div className="col-6">
          <img
            src={be}
            className="card-img-top"
            alt="..."
            width="380"
            height="410"
          />
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};
export default Brands;
