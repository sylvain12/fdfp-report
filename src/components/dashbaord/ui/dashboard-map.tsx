"use client";

import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useRef, useEffect } from "react";
import { Topology } from "topojson-specification";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useWindowSize } from '@uidotdev/usehooks';
import { BusinessPartnerType } from '../model';
import { useDashbaordBusinessPartnerStore } from '../store';


export default function DashboardMap() {
  const businessPartner = useDashbaordBusinessPartnerStore(state => state.businessPartner);
  const isLoading = useDashbaordBusinessPartnerStore(state => state.isLoading);

  const map = useRef<SVGSVGElement | null>(null);
  let width = 600;
  let height = 550;
  let scale = 4500;

  const addRegionName = () => null;
  const getRegionName = (features: Feature[]): string[] => {
    return features.map((f) => f.properties!["name"]);
  };

  const size = useWindowSize();

  const x = d3.scaleLinear().domain([1, 10]).rangeRound([600, 860]);

  // const color = d3
  //   .scaleThreshold()
  //   .domain(d3.range(2, 10))
  //   .range(d3.schemeBlues[9]);

  const clearMap = (): void => {
    d3.selectAll("svg > *").remove();
    if (size.width && size.width <= 1484) width = 500;
    if (size.width && size.width <= 650) scale = 3500;
  };

  // clearMap()

  useEffect(() => {
    console.log(businessPartner);
    const svg = d3
      .select(map.current)
      .attr("width", width)
      .attr("height", height)
      .attr("margin", "auto");

    // const url = "ci.json";

    const url =
      "https://code.highcharts.com/mapdata/countries/ci/ci-all.topo.json";

    d3.json(url)
      .then((data: any) => {
        const projection = d3
          .geoMercator()
          .center([-5.5471, 7.5399])
          .scale(scale)
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

        // Tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        // console.log(color("N'zi-Comoé"));

        // console.log("Features => ", features);

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
          .on("mouseover", (e: MouseEvent, d: any) => {
            console.log("event => ", e);
            console.log(d['properties']['name'])
            const [x, y] = d3.pointer(e);
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip
              .html("Hello")
              .style("left", x + "px")
              .style("top", y + "px");
          })
          .on("mouseout", (d: any) => {
            tooltip.transition().duration(500).style("opacity", 0);
          })
          .exit()
          // .style("stroke-width", 0.3)
          // .append("text")
          // .text((d: any) => d.properties!["name"])
          // .attr("color", "red")
          // .exit()

      })
      .catch((error) =>
        console.log("Error loading or parsing TopoJSON data: ", error)
      );

    return () => {
    };
  }, [size.width]);

  return <svg style={{ margin: "auto", width: "auto" }} ref={map}></svg>
}
