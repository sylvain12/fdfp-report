"use client";

import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useRef, useEffect } from "react";
import { Topology } from "topojson-specification";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useWindowSize } from '@uidotdev/usehooks';
import { BusinessPartnerType } from '../model';
import { useDashbaordBusinessPartnerStore } from '../store';
import { currencyFormatter, clearMap } from '@/lib/utils';




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
  let scale = 4500;

  const getRegionName = (): {name: string, total: number}[] => {
    return businessPartner.map(d =>( {name: d.district, total: d.total_district}))
  };

  const size = useWindowSize();

  function getDistrictInfo(district: string): BusinessPartnerType {
    return businessPartner.find((dist) => dist.district.toLowerCase() === district.toLowerCase())!
  }


  // Mouseover event to show tooltip
  function handleMouseOver(e: MouseEvent, d: any) {
    const data = getDistrictInfo(d.properties.name);
    d3.select("#tooltip").classed("visible", true).html(`
      <div class='border-b flex items-center justify-between py-4 gap-[10rem]'>
        <p class='flex flex-col font-medium'>
          <span class='leading-[10px]'>District</span>
          <span class='uppercase text-fdfp-second text-[1.6rem] font-bold'>${
            d.properties.name
          }</span>
        </p>

        <span class='flex items-center justify-center text-fdfp-second p-1 rounded-full font-semibold'>
          ${data.total_district}
        </span>
      </div>

      <div class='grid grid-cols-1 grid-flow-row mt-4'>
        ${data.regions && data.regions.map((item) => (`
          <div class="flex items-center justify-between rounded-sm bg-foreground text-background p-1">
            <p class="uppercase font-medium text-[1.2rem]">${item.region}</p>
            <p class="text-right font-semibold text-fdfp-second">
              ${currencyFormatter(item.total_count)}
            </p>
          </div>
        `))}
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

function buildMap() {
 clearMap();
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
    const districts = getRegionName();
    const totals = districts.map((d) => d.total).sort((a, b) => a - b);
    const regions = districts.map((d) => d.name);

    const x = d3.scaleLinear().domain([1, 10]).rangeRound([10, 500]);

    // Color Scale from district total_count
    const colorScale = d3
      .scaleQuantile(d3.schemeBlues[9])
      .domain([0, d3.max(totals)!]);

    const legendEntriesList = colorScale.range().map((d: any) => {
      d = colorScale.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    });

    let legendEntries = new Set();

    const legendData = legendEntriesList.map((value: any, index: number) => {
      return { color: colorScale.range()[index], districtRange: value };
    });

    function findColorForDistrict(value: number) {
      const result = legendData.find(
        (item) =>
          value >= item.districtRange[0] && value <= item.districtRange[1]
      );
      return result ? result : null;
    }

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
        const district = districts.find(
          (dist) => dist.name.toLowerCase() === d.properties.name.toLowerCase()
        );
        const item = findColorForDistrict(district!.total);
        legendEntries.add(item);
        return item ? item.color : "#000";
      })
      .attr("stroke", "#cecece")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut)
      .attr("d", path);

    // District text
    svg
      .selectAll("text")
      .data(features)
      .enter()
      .append("text")
      .attr("x", (d) => path.centroid(d)[0])
      .attr("y", (d) => path.centroid(d)[1])
      .attr("text-anchor", "middle")
      .attr("font-size", "9px")
      .text((d) => (d.properties!["name"] as string).toUpperCase())
      .attr("class", "district__text");

    // Create a legend
    const legend = d3.select("#legend").selectAll("div").data(legendEntries);

    legend
      .enter()
      .append("div")
      .attr("class", "legend-item")
      .html(
        (d: any) =>
          `<span style="background-color: ${
            d.color
          }; width: 18px; height: 18px; display: inline-block;"></span> ${Math.floor(
            d.districtRange[0]
          )} - ${Math.floor(d.districtRange[1])}`
      );
  })
  .catch((error) =>
    console.log("Error loading or parsing TopoJSON data: ", error)
  );
}

  useEffect(() => {
    buildMap()

    return () => {
     
    };
  }, [businessPartner]);

  return <svg style={{ margin: "auto", width: "auto" }} ref={map}></svg>;
}
