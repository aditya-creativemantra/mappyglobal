"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import {
  AlertTriangle,
  Briefcase,
  CalendarDays,
  CalendarClock,
  Clock3,
  LoaderCircle,
  Plus,
  Sparkles,
  Trash2,
  Users
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  buildReferenceUsage,
  DEEP_CLEANING_TIERS,
  NORMAL_CLEANING,
  TIME_SLOTS,
  WORKFORCE_CAP,
  getDeepCleaningTier
} from "@/lib/tidyhomes";

function createDeepAppointment() {
  return {
    id: crypto.randomUUID(),
    sizeTierId: DEEP_CLEANING_TIERS[0].id,
    furnitureIncluded: false,
    timeSlotId: TIME_SLOTS[0].id
  };
}

function createNormalAppointment() {
  return {
    id: crypto.randomUUID(),
    timeSlotId: TIME_SLOTS[0].id
  };
}

function createInitialState() {
  return {
    deepAppointments: [createDeepAppointment()],
    normalAppointments: [createNormalAppointment()]
  };
}

function syncCount(list, nextCount, createItem) {
  const safeCount = Number.isFinite(nextCount) ? Math.max(0, Math.min(20, nextCount)) : 0;

  if (safeCount === list.length) return list;
  if (safeCount < list.length) return list.slice(0, safeCount);

  return [...list, ...Array.from({ length: safeCount - list.length }, createItem)];
}

function reducer(state, action) {
  switch (action.type) {
    case "setDeepCount":
      return {
        ...state,
        deepAppointments: syncCount(state.deepAppointments, action.value, createDeepAppointment)
      };
    case "setNormalCount":
      return {
        ...state,
        normalAppointments: syncCount(state.normalAppointments, action.value, createNormalAppointment)
      };
    case "addDeep":
      return { ...state, deepAppointments: [...state.deepAppointments, createDeepAppointment()] };
    case "addNormal":
      return { ...state, normalAppointments: [...state.normalAppointments, createNormalAppointment()] };
    case "removeDeep":
      return {
        ...state,
        deepAppointments: state.deepAppointments.filter((appointment) => appointment.id !== action.id)
      };
    case "removeNormal":
      return {
        ...state,
        normalAppointments: state.normalAppointments.filter((appointment) => appointment.id !== action.id)
      };
    case "updateDeep":
      return {
        ...state,
        deepAppointments: state.deepAppointments.map((appointment) =>
          appointment.id === action.id ? { ...appointment, [action.field]: action.value } : appointment
        )
      };
    case "updateNormal":
      return {
        ...state,
        normalAppointments: state.normalAppointments.map((appointment) =>
          appointment.id === action.id ? { ...appointment, [action.field]: action.value } : appointment
        )
      };
    case "reset":
      return createInitialState();
    default:
      return state;
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0
  }).format(value);
}

function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </div>
  );
}

function labelClassForSlot(slot) {
  return slot.fullyBooked ? "destructive" : slot.staffRemaining <= 3 ? "warning" : "success";
}

function SlotOverviewCard({ slot, capacity }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">{slot.label}</p>
          <p className="mt-1 text-xs text-slate-500">
            {slot.staffUsed}/{WORKFORCE_CAP} used
          </p>
        </div>
        <Badge variant={labelClassForSlot(slot)}>{slot.fullyBooked ? "Full" : "Open"}</Badge>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${slot.fullyBooked ? "bg-rose-400" : slot.staffRemaining <= 3 ? "bg-amber-400" : "bg-emerald-500"}`}
          style={{ width: `${Math.min((slot.staffUsed / WORKFORCE_CAP) * 100, 100)}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-500">Remaining</span>
        <span className="font-semibold text-slate-950">{slot.staffRemaining} workers</span>
      </div>

      {capacity ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-100 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Normal</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{capacity.normalCleaningCount} more</p>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Best deep</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {Math.max(...capacity.deepCleaningOptions.map((option) => option.maxAdditionalBookings))} fit
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function getDefaultBookingDate() {
  const now = new Date();
  const timezoneSafe = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return timezoneSafe.toISOString().slice(0, 10);
}

function formatDisplayDate(value) {
  if (!value) return "Pick a date";

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function getNextAvailableSlot(slots, currentTimeSlotId) {
  const currentIndex = slots.findIndex((slot) => slot.timeSlotId === currentTimeSlotId);

  if (currentIndex === -1) {
    return slots.find((slot) => !slot.fullyBooked) || null;
  }

  const laterAvailableSlot = slots.slice(currentIndex + 1).find((slot) => !slot.fullyBooked);
  if (laterAvailableSlot) return laterAvailableSlot;

  return slots.find((slot) => !slot.fullyBooked) || null;
}

function SlotAgendaRow({ slot, slots, capacity, bookingDateLabel, analysisReady }) {
  const nextAvailableSlot = getNextAvailableSlot(slots, slot.timeSlotId);
  const bestDeepCapacity = capacity
    ? Math.max(...capacity.deepCleaningOptions.map((option) => option.maxAdditionalBookings))
    : null;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[140px_minmax(0,1fr)_180px] lg:items-center">
      <div className="rounded-xl bg-slate-100 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Date</p>
        <p className="mt-1 text-sm font-semibold text-slate-950">{bookingDateLabel}</p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-slate-950">{slot.label}</p>
          <Badge variant={labelClassForSlot(slot)}>{slot.fullyBooked ? "Fully booked" : "Available"}</Badge>
          <Badge variant="outline">{analysisReady ? "AI confirmed" : "Live preview"}</Badge>
        </div>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {slot.staffUsed}/{WORKFORCE_CAP} workers used in this slot group, {slot.staffRemaining} still available.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-emerald-50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Individual</p>
          <p className="mt-1 text-sm font-semibold text-emerald-950">
            {capacity ? `${capacity.normalCleaningCount} more` : "Run AI"}
          </p>
        </div>
        <div className="rounded-xl bg-amber-50 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">Best deep fit</p>
          <p className="mt-1 text-sm font-semibold text-amber-950">
            {capacity ? `${bestDeepCapacity} more` : "Run AI"}
          </p>
        </div>
      </div>
      </div>

      <div className="mt-4 grid gap-2 lg:grid-cols-3">
        {capacity ? (
          capacity.deepCleaningOptions.map((option) => (
            <div key={option.sizeTierId} className="rounded-xl bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Deep cleaning</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{option.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">{option.maxAdditionalBookings} more in this slot</p>
            </div>
          ))
        ) : (
          <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-500 lg:col-span-3">
            Run AI analysis to see deep-cleaning capacity by square-foot tier for this time slot.
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Next possible available slot</p>
        <p className="mt-1 text-sm font-semibold text-slate-950">
          {!slot.fullyBooked
            ? `${slot.label} is still available on ${bookingDateLabel}`
            : nextAvailableSlot
              ? `${nextAvailableSlot.label} on ${bookingDateLabel}`
              : `No more available slots on ${bookingDateLabel}`}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const [bookingDate, setBookingDate] = useState(getDefaultBookingDate);
  const [analysis, setAnalysis] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const referenceUsage = useMemo(
    () => buildReferenceUsage(state.deepAppointments, state.normalAppointments),
    [state.deepAppointments, state.normalAppointments]
  );

  const summary = useMemo(() => {
    const deepStaff = state.deepAppointments.reduce((total, appointment) => {
      const tier = getDeepCleaningTier(appointment.sizeTierId);
      return total + (tier?.staffRequired || 0);
    }, 0);

    return {
      bookingCount: state.deepAppointments.length + state.normalAppointments.length,
      deepStaff,
      normalStaff: state.normalAppointments.length * NORMAL_CLEANING.staffRequired,
      morningRemaining: referenceUsage.find((slot) => slot.timeSlotId === "morning-short")?.staffRemaining || 0,
      afternoonRemaining: referenceUsage.find((slot) => slot.timeSlotId === "afternoon-short")?.staffRemaining || 0
    };
  }, [referenceUsage, state.deepAppointments, state.normalAppointments.length]);

  const formattedBookingDate = useMemo(() => formatDisplayDate(bookingDate), [bookingDate]);

  useEffect(() => {
    setAnalysis(null);
    setError("");
  }, [state, bookingDate]);

  async function analyzeBookings() {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/booking-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingDate,
          deepAppointments: state.deepAppointments.map(({ sizeTierId, furnitureIncluded, timeSlotId }) => ({
            sizeTierId,
            furnitureIncluded,
            timeSlotId
          })),
          normalAppointments: state.normalAppointments.map(({ timeSlotId }) => ({ timeSlotId }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to analyze booking availability.");
      }

      setAnalysis(data);
    } catch (requestError) {
      setAnalysis(null);
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const slotStatus = analysis?.slotStatus || referenceUsage;
  const capacityBySlot = new Map((analysis?.additionalCapacity || []).map((entry) => [entry.timeSlotId, entry]));
  const availableCount = slotStatus.filter((slot) => !slot.fullyBooked).length;
  const analysisDateLabel = analysis?.bookingDateLabel || formattedBookingDate;
  const nextOverallAvailableSlot = slotStatus.find((slot) => !slot.fullyBooked) || null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.14),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.16),_transparent_24%),linear-gradient(180deg,_#f7fbfa_0%,_#eef4f2_50%,_#f8f1e5_100%)] p-4 text-slate-950">
      <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col gap-4">
        <header className="rounded-[30px] border border-white/70 bg-white/75 px-5 py-4 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="gap-1.5 border-emerald-900/10 bg-emerald-50 text-emerald-900">
                  <Sparkles className="h-3.5 w-3.5" />
                  TidyHomes Ops
                </Badge>
                <Badge variant="outline" className="border-slate-200 bg-white text-slate-600">
                  15 workers live
                </Badge>
                <Badge variant="outline" className="border-slate-200 bg-white text-slate-600">
                  Single-day simulator
                </Badge>
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 xl:text-3xl">
                Booking availability at a glance
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Enter existing bookings on the left, then run the AI engine to validate manpower and see how many more
                jobs fit in each slot without leaving this screen.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm">
                <CalendarDays className="h-4 w-4 text-emerald-700" />
                <span className="font-medium text-slate-950">Selected date:</span>
                <span>{formattedBookingDate}</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[620px] xl:grid-cols-4">
              <StatCard label="Workers" value={`${WORKFORCE_CAP}`} helper="Per morning or afternoon group" />
              <StatCard label="Bookings" value={`${summary.bookingCount}`} helper="Deep and normal combined" />
              <StatCard label="Morning left" value={`${summary.morningRemaining}`} helper="Shared by both 8 AM slots" />
              <StatCard label="Afternoon left" value={`${summary.afternoonRemaining}`} helper="Shared by both 2 PM slots" />
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.9fr_1.3fr]">
          <Card className="border-white/70 bg-white/80 xl:max-h-[calc(100vh-10.5rem)] xl:overflow-hidden">
            <CardHeader className="border-b border-slate-200/80 px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge variant="secondary" className="gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    Panel 1
                  </Badge>
                  <CardTitle className="mt-3 text-lg">Deep Cleaning</CardTitle>
                  <CardDescription className="mt-1">
                    Size, furniture, slot, price, and manpower in one compact list.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={state.deepAppointments.length}
                    onChange={(event) => dispatch({ type: "setDeepCount", value: Number(event.target.value) })}
                    className="w-20"
                  />
                  <Button type="button" variant="outline" className="gap-2" onClick={() => dispatch({ type: "addDeep" })}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-5 py-4 xl:min-h-0">
              <ScrollArea className="xl:h-[calc(100vh-18rem)] xl:pr-4">
                <div className="space-y-3">
                  {state.deepAppointments.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                      No deep-cleaning bookings entered.
                    </div>
                  ) : null}

                  {state.deepAppointments.map((appointment, index) => {
                    const tier = getDeepCleaningTier(appointment.sizeTierId);
                    const price = appointment.furnitureIncluded ? tier.withFurniturePrice : tier.withoutFurniturePrice;

                    return (
                      <div key={appointment.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Booking {index + 1}</Badge>
                            <Badge variant="success">{formatCurrency(price)}</Badge>
                            <Badge variant="warning">{tier.staffRequired} staff</Badge>
                          </div>
                          <button
                            type="button"
                            onClick={() => dispatch({ type: "removeDeep", id: appointment.id })}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:text-rose-600"
                            aria-label={`Remove deep cleaning booking ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 grid gap-2 md:grid-cols-2">
                          <Select
                            value={appointment.sizeTierId}
                            onChange={(event) =>
                              dispatch({
                                type: "updateDeep",
                                id: appointment.id,
                                field: "sizeTierId",
                                value: event.target.value
                              })
                            }
                          >
                            {DEEP_CLEANING_TIERS.map((sizeTier) => (
                              <option key={sizeTier.id} value={sizeTier.id}>
                                {sizeTier.label}
                              </option>
                            ))}
                          </Select>

                          <Select
                            value={appointment.timeSlotId}
                            onChange={(event) =>
                              dispatch({
                                type: "updateDeep",
                                id: appointment.id,
                                field: "timeSlotId",
                                value: event.target.value
                              })
                            }
                          >
                            {TIME_SLOTS.map((timeSlot) => (
                              <option key={timeSlot.id} value={timeSlot.id}>
                                {timeSlot.label}
                              </option>
                            ))}
                          </Select>

                          <Select
                            value={appointment.furnitureIncluded ? "yes" : "no"}
                            onChange={(event) =>
                              dispatch({
                                type: "updateDeep",
                                id: appointment.id,
                                field: "furnitureIncluded",
                                value: event.target.value === "yes"
                              })
                            }
                            className="md:col-span-2"
                          >
                            <option value="no">Without furniture</option>
                            <option value="yes">With furniture</option>
                          </Select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white/80 xl:max-h-[calc(100vh-10.5rem)] xl:overflow-hidden">
            <CardHeader className="border-b border-slate-200/80 px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge variant="secondary" className="gap-1.5 bg-amber-100 text-amber-900">
                    <CalendarClock className="h-3.5 w-3.5" />
                    Panel 2
                  </Badge>
                  <CardTitle className="mt-3 text-lg">Normal Cleaning</CardTitle>
                  <CardDescription className="mt-1">
                    Each appointment is {formatCurrency(NORMAL_CLEANING.price)} and uses 1 worker.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={state.normalAppointments.length}
                    onChange={(event) => dispatch({ type: "setNormalCount", value: Number(event.target.value) })}
                    className="w-20"
                  />
                  <Button type="button" variant="outline" className="gap-2" onClick={() => dispatch({ type: "addNormal" })}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-5 py-4 xl:min-h-0">
              <ScrollArea className="xl:h-[calc(100vh-18rem)] xl:pr-4">
                <div className="space-y-3">
                  {state.normalAppointments.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                      No normal-cleaning bookings entered.
                    </div>
                  ) : null}

                  {state.normalAppointments.map((appointment, index) => (
                    <div key={appointment.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Booking {index + 1}</Badge>
                          <Badge variant="success">{formatCurrency(NORMAL_CLEANING.price)}</Badge>
                          <Badge variant="warning">1 staff</Badge>
                        </div>
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "removeNormal", id: appointment.id })}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:text-rose-600"
                          aria-label={`Remove normal cleaning booking ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-3">
                        <Select
                          value={appointment.timeSlotId}
                          onChange={(event) =>
                            dispatch({
                              type: "updateNormal",
                              id: appointment.id,
                              field: "timeSlotId",
                              value: event.target.value
                            })
                          }
                        >
                          {TIME_SLOTS.map((timeSlot) => (
                            <option key={timeSlot.id} value={timeSlot.id}>
                              {timeSlot.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/88 xl:max-h-[calc(100vh-10.5rem)] xl:overflow-hidden">
            <CardHeader className="border-b border-slate-200/80 px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge variant="outline" className="gap-1.5 border-emerald-200 bg-emerald-50 text-emerald-900">
                    <Sparkles className="h-3.5 w-3.5" />
                    Panel 3
                  </Badge>
                  <CardTitle className="mt-3 text-lg">Availability Engine</CardTitle>
                  <CardDescription className="mt-1">
                    Pick a date, review all slots for that day, and inspect detailed capacity one tab away.
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Booking date</p>
                    <div className="mt-1 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-emerald-700" />
                      <Input
                        type="date"
                        value={bookingDate}
                        onChange={(event) => setBookingDate(event.target.value)}
                        className="h-auto border-0 bg-transparent p-0 text-sm font-medium shadow-none focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Button type="button" className="gap-2" onClick={analyzeBookings} disabled={isSubmitting}>
                    {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Analyze
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      dispatch({ type: "reset" });
                      setAnalysis(null);
                      setError("");
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 px-5 py-4 xl:min-h-0">
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-slate-100 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Date</p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">{analysisDateLabel}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Status</p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">{analysis ? "AI analyzed" : "Waiting for run"}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Open slots</p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">{availableCount} of 4</p>
                </div>
                <div className="rounded-2xl bg-slate-100 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Overlap logic</p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">8 AM and 2 PM groups</p>
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                </div>
              ) : null}

              <Tabs defaultValue="overview" className="flex flex-1 flex-col xl:min-h-0">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview" className="gap-2">
                    <Clock3 className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="capacity" className="gap-2">
                    <Users className="h-4 w-4" />
                    Capacity Detail
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="flex-1 space-y-4 xl:min-h-0">
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={analysis ? "success" : "outline"}>{analysis ? "AI verdict ready" : "Reference view"}</Badge>
                      {analysis ? <Badge variant="outline">Availability refreshed</Badge> : null}
                      <Badge variant="outline">{analysisDateLabel}</Badge>
                    </div>
                    <p className="mt-3 text-base font-semibold text-slate-950">
                      {analysis?.bookingVerdict || "Run the AI engine to confirm slot availability and booking fit."}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {analysis?.naturalLanguageSummary ||
                        "The cards below already show current manpower pressure from your inputs. AI analysis adds the final slot-by-slot capacity breakdown."}
                    </p>
                    <div className="mt-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Next possible available slot</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">
                        {nextOverallAvailableSlot
                          ? `${nextOverallAvailableSlot.label} on ${analysisDateLabel}`
                          : `No available slots left on ${analysisDateLabel}`}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Available slots for selected date</p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">
                          {analysisDateLabel} schedule board
                        </p>
                      </div>
                      <Badge variant={availableCount === 0 ? "destructive" : "success"}>
                        {availableCount} slot{availableCount === 1 ? "" : "s"} available
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-3">
                      {slotStatus.map((slot) => (
                        <SlotAgendaRow
                          key={slot.timeSlotId}
                          slot={slot}
                          slots={slotStatus}
                          capacity={capacityBySlot.get(slot.timeSlotId)}
                          bookingDateLabel={analysisDateLabel}
                          analysisReady={Boolean(analysis)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {slotStatus.map((slot) => (
                      <SlotOverviewCard key={slot.timeSlotId} slot={slot} capacity={capacityBySlot.get(slot.timeSlotId)} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="capacity" className="flex-1 xl:min-h-0">
                  {analysis ? (
                    <ScrollArea className="xl:h-[calc(100vh-27rem)] xl:pr-4">
                      <div className="space-y-3">
                        {analysis.slotStatus.map((slot) => {
                          const capacity = capacityBySlot.get(slot.timeSlotId);

                          return (
                            <div key={slot.timeSlotId} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-slate-950">{slot.label}</p>
                                    <Badge variant={labelClassForSlot(slot)}>
                                      {slot.fullyBooked ? "Fully booked" : `${slot.staffRemaining} left`}
                                    </Badge>
                                  </div>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {slot.staffUsed}/{WORKFORCE_CAP} workers used in this shared slot group
                                  </p>
                                </div>
                                <div className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                                  {capacity.normalCleaningCount} more individual appointments
                                </div>
                              </div>

                              <div className="mt-4 grid gap-2 md:grid-cols-2">
                                {capacity.deepCleaningOptions.map((option) => (
                                  <div key={option.sizeTierId} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                                    <span className="pr-3 text-xs leading-5 text-slate-600">{option.label}</span>
                                    <span className="text-sm font-semibold text-slate-950">{option.maxAdditionalBookings}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm leading-6 text-slate-500">
                      Analyze the bookings first to view per-slot deep-cleaning capacity by house-size tier.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
