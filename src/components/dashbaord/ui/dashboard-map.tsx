"use client";

import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useRef, useEffect } from "react";
import { Topology } from "topojson-specification";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";


export default function DashboardMap() {
  const map = useRef<SVGSVGElement | null>(null);
  let width = 350;
  let height = 350;

  const addRegionName = () => null;
  const getRegionName = (features: Feature[]): string[] => {
    return features.map((f) => f.properties!["name"]);
  };

  const x = d3.scaleLinear().domain([1, 10]).rangeRound([600, 860]);

  // const color = d3
  //   .scaleThreshold()
  //   .domain(d3.range(2, 10))
  //   .range(d3.schemeBlues[9]);

  useEffect(() => {

    const svg = d3
      .select(map.current)
      .attr("width", width)
      .attr("height", height);

    // const url = "ci.json";

    const url =
      "https://code.highcharts.com/mapdata/countries/ci/ci-all.topo.json";

    d3.json(url)
      .then((data: any) => {
        const projection = d3
          .geoMercator()
          .center([-5.5471, 7.5399])
          .scale(3000)
          .translate([width / 2, height / 2]);

        const path: any = d3.geoPath().projection(projection);
        const features: any = (
          topojson.feature(
            data,
            data.objects["default"]
          ) as unknown as d3.ExtendedFeatureCollection
        ).features as unknown as d3.ExtendedFeature;

        const regions = getRegionName(features);

        const color = d3
          .scaleOrdinal()
          .domain(regions)
          .range(d3.schemeBlues[9]);

        console.log(color("N'zi-Comoé"));

        console.log("Features => ", features);

        // Build map path
        svg
          .append("g")
          .attr("class", "regions")
          .selectAll("path")
          .data(features!)
          .enter()
          .append("path")
          .attr("fill", (d: any): any => {
            return color(d.properties!["name"]);
          })
          .attr("d", path)
          .style("stroke-width", 0.3)
          .append("text")
          .text((d: any) => d.properties!["name"])
          .attr("color", "red");

        // Add Region name to map
        // svg.
      })
      .catch((error) =>
        console.log("Error loading or parsing TopoJSON data: ", error)
      );

    return () => {};
  }, []);

  return <svg style={{margin: 'auto'}} ref={map}></svg>
}
