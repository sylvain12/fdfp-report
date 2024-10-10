"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {trainingPlan, trainingProject, trainingActionLiquied } from './data'
import { currencyFormatter } from '@/lib/utils';
import { useDashboardAgreedProductsStore, useDashboardTrainngPlanStore } from './store';
import { DashboardArcordionLoader, SkeletonCard } from './dashboard-loader';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



export default function DashboardPart1() {

  // Agreed Products
  const approvedProducts = useDashboardAgreedProductsStore(state => state.approvedProducts)
  const isApprovedProductsLoading = useDashboardAgreedProductsStore(state => state.isDataLoading)

  // Training Plan 
  // const trainingPlan = useDashboardTrainngPlanStore(state => state.dashboardData)
  const isTrainingPlanDataLoading = useDashboardTrainngPlanStore(state => state.isLoading)

  return (
    <div className="flex-grow flex flex-col w-full">
      {isApprovedProductsLoading ? (
        <SkeletonCard />
      ) : (
        <>
          <h2 className="text-[2rem] font-semibold mb-[1rem] font-clash-display">
            PRODUITS DU FDFP
          </h2>
          <p className="text-[1.6rem] mb-4 font-clash-display font-medium">
            Récapitulatif des produits agréés par le FDFP
          </p>
          <div className="grid grid-cols-2 grid-rows-2 gap-[2rem] w-full max-md:grid-cols-1 max-[1300px]:grid-cols-1">
            {approvedProducts.map((product) => (
              <Card key={product.label} className="flex-grow col-span-1">
                <CardHeader className="border-b">
                  <CardTitle className="font-light">{product.label}</CardTitle>
                </CardHeader>
                <CardContent className="flex py-4 gap-3">
                  <div className="flex-grow">
                    <p className="font-light text-[1.3rem]">Financement</p>
                    <span className="text-[2rem] text-fdfp-second font-medium font-clash-display">
                      {currencyFormatter(product.amount)}
                    </span>
                  </div>
                  <div className="pr-[2rem] flex-grow">
                    <p className="font-light text-[1.3rem]">Effectif</p>
                    <span className="text-[2rem] text-fdfp-second font-medium font-clash-display">
                      {currencyFormatter(product.total)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <div className="my-[4rem] flex">
        <div className="flex-grow">
          <div className="flex max-md:hidden">
            <Tabs defaultValue="plan" className="w-full">
              <TabsList>
                <TabsTrigger value="plan" variant="underline">
                  Plan de formation
                </TabsTrigger>
                <TabsTrigger value="projects" variant="underline">
                  Projets de formation agréés
                </TabsTrigger>
                <TabsTrigger value="actions" variant="underline">
                  Actions de formation liquidées
                </TabsTrigger>
              </TabsList>
              <TabsContent value="plan">
                <div className="flex gap-[2rem] flex-wrap items-center">
                  {trainingPlan.map((training) => (
                    <div
                      key={training.label}
                      className="flex flex-col basis-[230px]"
                    >
                      <span className="text-[1.8rem] text-fdfp-second font-clash-display">
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
              </TabsContent>
              <TabsContent value="projects">
                <div className="flex gap-[2rem] flex-wrap items center">
                  {trainingProject.map((training) => (
                    <div
                      key={training.label}
                      className="flex flex-col basis-[230px]"
                    >
                      <span className="text-[1.8rem] text-fdfp-second font-clash-display">
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
              </TabsContent>
              <TabsContent value="actions">
                <div className="flex gap-[2rem] flex-wrap items center">
                  {trainingActionLiquied.map((training) => (
                    <div
                      key={training.label}
                      className="flex flex-col basis-[230px]"
                    >
                      <span className="text-[1.8rem] text-fdfp-second font-clash-display">
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
              </TabsContent>
            </Tabs>
          </div>

          <div className="hidden max-md:flex">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-clash-display font-medium">
                  Plan de formation
                </AccordionTrigger>
                <AccordionContent>
                  {isTrainingPlanDataLoading ? (
                    <DashboardArcordionLoader />
                  ) : (
                    <div className="flex gap-[2rem] flex-wrap items-center">
                      {trainingPlan.map((training) => (
                        <div
                          key={training.label}
                          className="flex flex-col basis-[230px]"
                        >
                          <span className="text-[1.8rem] text-fdfp-second font-clash-display">
                            {currencyFormatter(
                              training.value,
                              ",",
                              false,
                              training.extention
                            )}
                          </span>
                          <span className="text-[1.2rem]">
                            {training.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-clash-display font-medium">
                  Projets de formation agréés
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-[2rem] flex-wrap items center">
                    {trainingProject.map((training) => (
                      <div
                        key={training.label}
                        className="flex flex-col basis-[230px]"
                      >
                        <span className="text-[1.8rem] text-fdfp-second font-clash-display">
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
                <AccordionTrigger className="font-clash-display font-medium">
                  Actions de formation liquidées
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-[2rem] flex-wrap items center">
                    {trainingActionLiquied.map((training) => (
                      <div
                        key={training.label}
                        className="flex flex-col basis-[230px]"
                      >
                        <span className="text-[1.8rem] text-fdfp-second font-clash-display">
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
        </div>
      </div>
    </div>
  );
}
