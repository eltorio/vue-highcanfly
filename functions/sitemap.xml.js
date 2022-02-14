import sanity from "@/plugins/sanity-client";
import {getRoutesList,getRoutesXML,getSlugList} from "@/sitemapHelper.js";

//ToDo extract automatically from router
const routes = [
    {
        path: "/policy",
        name: "Policy",
    },
    {
        path: "/landing",
        name: "Landing",
    },
    {
        path: "/blog",
        name: "Blog",
    },
    {
        path: "/about",
        name: "À propos",
    },
    {
        path: "/index-new",
    },
    {
        path: "/contact",
        name: 'contactez-nous'
    },
    {
        path: "/trackjoiner",
        name: 'Joignez vos traces'
    },
    {
        path: "/trackjoiner/help",
        name: 'Joignez vos traces',
    },
    {
        path: "/windy",
        name: 'Le vent (Windy)'
    },
    {
        path: "/map-sites-de-pratique",
        name: "Sites de pratique",
    },
    {
        path: "/",
        name: 'index',
        _updatedAt: new Date("2022-02-12").toISOString()
    },
];

const query = `*[_type == "post"]{
    slug,_updatedAt
  }| order(slug asc)`;

let getResponse = function () {
    return new Promise((resolve, reject) => {
        sanity.fetch(query).then(
            (posts) => {
                const slugList = getSlugList(posts);
                let routesList = getRoutesList(routes);
                routesList = routesList.concat(slugList);
                resolve(getRoutesXML(routesList));
            },
            (error) => {
                reject(error);
            });
    }
    );
};

export async function onRequestGet(context) { //eslint-disable-line
console.log(context.env);
    let stringXML = await getResponse()
    return new Response(stringXML, {
        headers: {
          "content-type": "text/xml"
        }
      });


}