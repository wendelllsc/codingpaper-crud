-- CreateTable
CREATE TABLE `CodingPaper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `sampleSize` INTEGER NULL,
    `hasStudents` BOOLEAN NOT NULL DEFAULT false,
    `hasProfessionals` BOOLEAN NOT NULL DEFAULT false,
    `taskDuration` INTEGER NULL,
    `experimentalSetting` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guideline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecruitingStrategy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SampleCharacterization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DesignType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MeasuringOutcome` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemporalMeasurementMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectiveMeasurementMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodingExperimentSupport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingPaperToGuideline` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingPaperToGuideline_AB_unique`(`A`, `B`),
    INDEX `_CodingPaperToGuideline_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingPaperToRecruitingStrategy` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingPaperToRecruitingStrategy_AB_unique`(`A`, `B`),
    INDEX `_CodingPaperToRecruitingStrategy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingPaperToSampleCharacterization` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingPaperToSampleCharacterization_AB_unique`(`A`, `B`),
    INDEX `_CodingPaperToSampleCharacterization_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingPaperToDesignType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingPaperToDesignType_AB_unique`(`A`, `B`),
    INDEX `_CodingPaperToDesignType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingPaperToMeasuringOutcome` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingPaperToMeasuringOutcome_AB_unique`(`A`, `B`),
    INDEX `_CodingPaperToMeasuringOutcome_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingPaperToTemporalMeasurementMethod` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingPaperToTemporalMeasurementMethod_AB_unique`(`A`, `B`),
    INDEX `_CodingPaperToTemporalMeasurementMethod_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingPaperToSubjectiveMeasurementMethod` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingPaperToSubjectiveMeasurementMethod_AB_unique`(`A`, `B`),
    INDEX `_CodingPaperToSubjectiveMeasurementMethod_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CodingExperimentSupportToCodingPaper` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CodingExperimentSupportToCodingPaper_AB_unique`(`A`, `B`),
    INDEX `_CodingExperimentSupportToCodingPaper_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CodingPaperToGuideline` ADD FOREIGN KEY (`A`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToGuideline` ADD FOREIGN KEY (`B`) REFERENCES `Guideline`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToRecruitingStrategy` ADD FOREIGN KEY (`A`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToRecruitingStrategy` ADD FOREIGN KEY (`B`) REFERENCES `RecruitingStrategy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToSampleCharacterization` ADD FOREIGN KEY (`A`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToSampleCharacterization` ADD FOREIGN KEY (`B`) REFERENCES `SampleCharacterization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToDesignType` ADD FOREIGN KEY (`A`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToDesignType` ADD FOREIGN KEY (`B`) REFERENCES `DesignType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToMeasuringOutcome` ADD FOREIGN KEY (`A`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToMeasuringOutcome` ADD FOREIGN KEY (`B`) REFERENCES `MeasuringOutcome`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToTemporalMeasurementMethod` ADD FOREIGN KEY (`A`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToTemporalMeasurementMethod` ADD FOREIGN KEY (`B`) REFERENCES `TemporalMeasurementMethod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToSubjectiveMeasurementMethod` ADD FOREIGN KEY (`A`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingPaperToSubjectiveMeasurementMethod` ADD FOREIGN KEY (`B`) REFERENCES `SubjectiveMeasurementMethod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingExperimentSupportToCodingPaper` ADD FOREIGN KEY (`A`) REFERENCES `CodingExperimentSupport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CodingExperimentSupportToCodingPaper` ADD FOREIGN KEY (`B`) REFERENCES `CodingPaper`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
