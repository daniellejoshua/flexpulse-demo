import assert from "node:assert/strict";
import test from "node:test";
import { findKnowledge, isFlexPulseQuestion, isMedicalQuestion } from "./chat-server.mjs";

test("chat scope keeps FlexPulse topics and rejects unrelated questions", () => {
  assert.equal(isFlexPulseQuestion("How do I charge my FlexPulse?"), true);
  assert.equal(isFlexPulseQuestion("Write me a recipe"), false);
});

test("medical questions are routed to safety guidance", () => {
  assert.equal(isMedicalQuestion("Can I use this with a pacemaker?"), true);
  assert.equal(isMedicalQuestion("What programs does it have?"), false);
});

test("knowledge lookup finds the relevant FlexPulse source", () => {
  assert.equal(findKnowledge("What is the warranty?")[0].title, "Warranty and support");
});
