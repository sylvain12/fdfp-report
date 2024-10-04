"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {approvedProducts, trainingPlan, trainingProject, trainingActionLiquied } from './data'
import { currencyFormatter } from '@/lib/utils';
import DashboardMap from "./ui/dashboard-map";
import { useQuery } from '@tanstack/react-query';
import { DasbboardAgreedProductsDataType } from './model';
import { useEffect, useState } from 'react';
import { useDashboardAgreedProductsStore, useDashboardSelectedYear } from './store';
import { API_URL, API_DASHBOARD_AGREED_PRODUCT_PATH } from "@/lib/config";
import { stringify } from 'querystring';
import { SkeletonCard } from './dashboard-loader';


export default function DashboardPart1() {

  const approvedProducts = useDashboardAgreedProductsStore(state => state.approvedProducts)
  const isApprovedProductsLoading = useDashboardAgreedProductsStore(state => state.isDataLoading)

  return (
    <div className="my-[4rem]">
      {isApprovedProductsLoading ? (
        <SkeletonCard />
      ) : (
        <div className="my-[2rem]">
          <h2 className="text-[2rem] font-thin mb-[1rem] font-clash-display">
            PRODUITS DU FDFP
          </h2>
          <p className="font-clash-display text-[1.6rem] mb-4">
            Récapitulatif des produits agréés par le FDFP
          </p>
          <div className="flex items-center gap-[4rem]">
            {approvedProducts.map((product) => (
              <Card key={product.label} className="flex-grow">
                <CardHeader className="border-b">
                  <CardTitle className="font-clash-display font-light">
                    {product.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex py-4 gap-3 font-clash-display">
                  <div className="flex-grow">
                    <p className="font-light text-[1.3rem]">Financement</p>
                    <span className="text-[2rem] text-fdfp-second font-medium">
                      {currencyFormatter(product.amount)}
                    </span>
                  </div>
                  <div className="pr-[2rem] flex-grow">
                    <p className="font-light text-[1.3rem]">Effectif</p>
                    <span className="text-[2rem] text-fdfp-second font-medium">
                      {currencyFormatter(product.total)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="my-[4rem] flex">
        <div className="flex w-full gap-[2rem]">
          <div className="flex-grow">
            <Accordion type="single" collapsible className="font-clash-display">
              <AccordionItem value="item-1">
                <AccordionTrigger>Plan de formation</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-[2rem] flex-wrap items center">
                    {trainingPlan.map((training) => (
                      <div
                        key={training.label}
                        className="flex flex-col basis-[230px]"
                      >
                        <span className="text-[1.8rem] text-fdfp-second">
                          {currencyFormatter(
                            training.value,
                            ",",
                            false,
                            training.extention
                          )}
                        </span>
                        <span className="text-[1.2rem]">{training.label}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  IProjets de formation agréés
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-[2rem] flex-wrap items center">
                    {trainingProject.map((training) => (
                      <div
                        key={training.label}
                        className="flex flex-col basis-[230px]"
                      >
                        <span className="text-[1.8rem] text-fdfp-second">
                          {currencyFormatter(
                            training.value,
                            ",",
                            false,
                            training.extention
                          )}
                        </span>
                        <span className="text-[1.2rem]">{training.label}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Actions de formation liquidées
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-[2rem] flex-wrap items center">
                    {trainingActionLiquied.map((training) => (
                      <div
                        key={training.label}
                        className="flex flex-col basis-[230px]"
                      >
                        <span className="text-[1.8rem] text-fdfp-second">
                          {currencyFormatter(
                            training.value,
                            ",",
                            false,
                            training.extention
                          )}
                        </span>
                        <span className="text-[1.2rem]">{training.label}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* <div>
      <h2 className="text-[2rem] font-thin mb-[1rem] font-clash-display">ENTREPRISES PARTENAIRES</h2>
            <DashboardMap />
          </div>       */}
        </div>
      </div>
    </div>
  );
}
