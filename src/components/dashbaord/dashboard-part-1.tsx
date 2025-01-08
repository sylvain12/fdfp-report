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
import { currencyFormatter } from '@/lib/utils';
import { useDashboardAgreedProductsStore, useDashboardTrainngPlanStore, useDashboardTrainngProjectStore, useDashboardTrainingActiontStore } from './store';
import { DashboardArcordionLoader, SkeletonCard } from './dashboard-loader';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AlertFallback from '../errors/alert';



export default function DashboardPart1() {
  // Agreed Products
  const approvedProducts = useDashboardAgreedProductsStore(
    (state) => state.approvedProducts
  );
  const isApprovedProductsLoading = useDashboardAgreedProductsStore(
    (state) => state.isDataLoading
  );

  // Training Plan
  const trainingPlan = useDashboardTrainngPlanStore(
    (state) => state.dashboardData
  );
  const isTrainingPlanDataLoading = useDashboardTrainngPlanStore(
    (state) => state.isLoading
  );

  // Training Project
  const trainingProject = useDashboardTrainngProjectStore(
    (state) => state.dashboardData
  );
  const isTrainingProjectDataLoading = useDashboardTrainngProjectStore(
    (state) => state.isLoading
  );

// Training Action Liquided
const trainingActionLiquided = useDashboardTrainingActiontStore(state => state.dashboardData)
const isTrainingActionLiquidedLoading = useDashboardTrainingActiontStore(state => state.isLoading)

  return (
    <div className="w-full flex flex-col">
      <div>
        <h2 className="text-[2rem] font-semibold mb-[1rem] font-clash-display">
          PRODUITS DU FDFP
        </h2>
        <p className="text-[1.6rem] mb-4 font-clash-display font-medium">
          Récapitulatif des produits agréés par le FDFP
        </p>
        {approvedProducts.length === 0 && !isApprovedProductsLoading && (
          <AlertFallback onRetry={() => console.log("You retry")} />
        )}
        <div className="grid grid-cols-2 gap-[2rem] w-full max-md:grid-cols-1">
          {isApprovedProductsLoading ? (
            <SkeletonCard />
          ) : (
            approvedProducts.map((product) => (
              <Card key={product.label} className="col-span-1">
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
            ))
          )}
        </div>
      </div>

      <div className="mt-[4rem]">
        <div className="flex-1">
          <div className="flex max-md:hidden">
            <Tabs defaultValue="plan" className="w-full">
              <TabsList>
                <TabsTrigger value="plan">Plans de formation</TabsTrigger>
                <TabsTrigger value="projects">
                  Projets de formation agréés
                </TabsTrigger>
                <TabsTrigger value="actions">
                  Actions de formation liquidées
                </TabsTrigger>
              </TabsList>
              <TabsContent value="plan">
                {trainingPlan.length === 0 &&
                  !isTrainingActionLiquidedLoading && (
                    <AlertFallback onRetry={() => console.log("You retry")} />
                  )}
                <div className="flex gap-[2rem] flex-wrap items-center">
                  {isTrainingPlanDataLoading ? (
                    <DashboardArcordionLoader api="trainingPlan" />
                  ) : (
                    trainingPlan.map((training) => (
                      <div
                        key={`${training.label}`}
                        className="flex flex-col basis-[180px]"
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
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="projects">
                {trainingProject.length === 0 &&
                  !isTrainingProjectDataLoading && (
                    <AlertFallback onRetry={() => console.log("You retry")} />
                  )}
                <div className="flex gap-[2rem] flex-wrap items center">
                  {isTrainingProjectDataLoading ? (
                    <DashboardArcordionLoader api="trainingProject" />
                  ) : (
                    trainingProject.map((training) => (
                      <div
                        key={`${training.label}`}
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
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="actions">
                {trainingActionLiquided.length === 0 &&
                  !isTrainingActionLiquidedLoading && (
                    <AlertFallback onRetry={() => console.log("You retry")} />
                  )}
                <div className="flex gap-[2rem] flex-wrap items center">
                  {isTrainingActionLiquidedLoading ? (
                    <DashboardArcordionLoader api="trainingAction" />
                  ) : (
                    trainingActionLiquided.map((training) => (
                      <div
                        key={`${training.label}`}
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
                    ))
                  )}
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
                  Plans de formation
                </AccordionTrigger>
                <AccordionContent>
                  {trainingPlan.length === 0 &&
                    !isTrainingActionLiquidedLoading && (
                      <AlertFallback onRetry={() => console.log("You retry")} />
                    )}
                  {isTrainingPlanDataLoading ? (
                    <DashboardArcordionLoader api="trainingPlan" />
                  ) : (
                    <div className="flex gap-[2rem] flex-wrap items-center">
                      {trainingPlan.map((training) => (
                        <div
                          key={`${training.label}`}
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
                  {trainingProject.length === 0 &&
                    !isTrainingProjectDataLoading && (
                      <AlertFallback onRetry={() => console.log("You retry")} />
                    )}
                  <div className="flex gap-[2rem] flex-wrap items center">
                    {isTrainingProjectDataLoading ? (
                      <DashboardArcordionLoader api="traininProject" />
                    ) : (
                      trainingProject.map((training) => (
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
                      ))
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-clash-display font-medium">
                  Actions de formation liquidées
                </AccordionTrigger>
                <AccordionContent>
                  {trainingActionLiquided.length === 0 &&
                    !isTrainingActionLiquidedLoading && (
                      <AlertFallback onRetry={() => console.log("You retry")} />
                    )}
                  <div className="flex gap-[2rem] flex-wrap items center">
                    {isTrainingActionLiquidedLoading ? (
                      <DashboardArcordionLoader api="traininAction" />
                    ) : (
                      trainingActionLiquided.map((training) => (
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
                      ))
                    )}
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
