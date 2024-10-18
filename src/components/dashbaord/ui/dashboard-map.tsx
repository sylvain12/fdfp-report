"use client";

import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useRef, useEffect } from "react";
import { Topology } from "topojson-specification";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useWindowSize } from '@uidotdev/usehooks';
import { BusinessPartnerType } from '../model';
import { useDashbaordBusinessPartnerStore } from '../store';
import { currencyFormatter } from '@/lib/utils';




export default function DashboardMap() {
  const businessPartner = useDashbaordBusinessPartnerStore(
    (state) => state.businessPartner
  );
  const isLoading = useDashbaordBusinessPartnerStore(
    (state) => state.isLoading
  );

  const map = useRef<SVGSVGElement | null>(null);
  let width = 600;
  let height = 550;
  let scale = 5000;

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


  // Mouseover event to show tooltip
  function handleMouseOver(e: MouseEvent, d: any) {
    d3.select("#tooltip").classed("visible", true).html(`
      <div class='border-b flex items-center justify-between py-4 gap-[8rem]'>
        <p class='flex flex-col font-medium'>
          <span class='leading-[10px]'>District</span>
          <span class='uppercase text-fdfp-second text-[1.6rem] font-bold'>${
            d.properties.name
          }</span>
        </p>

      <span class='bg-foreground flex items-center justify-center h-10 w-10 text-background p-1 rounded-full font-semibold'>3</span>
      </div>

      <div class='grid grid-cols-1 grid-flow-row gap-2 mt-4'>
        <div class='flex items-center justify-between rounded-sm bg-foreground text-background p-3'>
          <p class='uppercase text-thin'>Gontougo</p>
          <p class='text-right text-bold text-fdfp-second'>${currencyFormatter(
            289
          )}</p>
        </div>
          <div class='flex items-center justify-between rounded-sm bg-foreground text-background p-3'>
          <p class='uppercase text-thin'>Boukani</p>
          <p class='text-right text-bold text-fdfp-second'>${currencyFormatter(
            1234
          )}</p>
        </div>
      </div>
    `);
  };

  // Mousemove event to position the tooltip
  function handleMouseMove(e: MouseEvent) {
    d3.select("#tooltip")
      .style("left", e.pageX + 10 + "px")
      .style("top", e.pageY - 30 + "px");
  }

  // Mouseout event to hide the tooltip
  function handleMouseOut() {
    d3.select("#tooltip").classed("visible", false);
  }

  useEffect(() => {
    const svg = d3
      .select(map.current)
      .attr("width", width)
      .attr("height", height)
      .attr("margin", "auto");

    const url = "/map/ci.json";

    d3.json<FeatureCollection>(url)
      .then((data: any) => {
        const projection = d3
          .geoMercator()
          .center([-5.5471, 7.5399])
          .scale(scale)
          .translate([width / 2, height / 2]);

        const path: any = d3.geoPath().projection(projection);
        const features = (data as FeatureCollection).features;
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

        // Build map path
        svg
          .selectAll("path")
          .data(features!)
          .enter()
          .append("path")
          .attr("class", "district")
          .attr("fill", (d: any): any => {
            return color(d.properties!["name"]);
          })
          .on("mouseover", handleMouseOver)
          .on("mousemove", handleMouseMove)
          .on("mouseout", handleMouseOut)
          .attr("d", path)

        // District text
        svg
          .selectAll("text")
          .data(features)
          .enter()
          .append("text")
          .attr("x", (d) => path.centroid(d)[0])
          .attr("y", (d) => path.centroid(d)[1])
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .text((d) => (d.properties!["name"] as string).toUpperCase())
          .attr("class", "district__text");
      })
      .catch((error) =>
        console.log("Error loading or parsing TopoJSON data: ", error)
      );

    return () => {};
  }, [size.width]);

  return <svg style={{ margin: "auto", width: "auto" }} ref={map}></svg>;
}
