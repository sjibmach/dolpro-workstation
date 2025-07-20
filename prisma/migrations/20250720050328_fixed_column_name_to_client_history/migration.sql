-- CreateEnum
CREATE TYPE "ClientStatusEnum" AS ENUM ('new', 'contacting', 'failedContact', 'interested', 'offerToSend', 'offerSent', 'negotiation', 'contactLater', 'activeWithoutContract', 'contracted', 'inactive', 'notInterested', 'blacklisted');

-- CreateEnum
CREATE TYPE "ClientStatusReasonEnum" AS ENUM ('noNeed', 'hasPartner', 'tooExpensive', 'usesInternal', 'tooComplicated', 'contractIssues', 'privacyConcerns', 'badCommunication', 'noOnline', 'badPayment', 'rude', 'unethical');
