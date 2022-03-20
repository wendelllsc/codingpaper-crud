import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const guidelineData: Prisma.GuidelineCreateInput[] = [
  {
    title: 'Guideline Teste',
    author: 'Luis Guilherme Siqueira'
  }
]

const recruitingStrategyData: Prisma.RecruitingStrategyCreateInput[] = [
  {
    name: 'Paid'
  },
  {
    name: 'Extra credit'
  },
  {
    name: 'Competition'
  },
  {
    name: 'No reward'
  },
  {
    name: 'Unknown'
  },
  
]

const designTypeData: Prisma.DesignTypeCreateInput[] = [
  {
    name: 'Maintenance'
  },
  {
    name: 'Writing'
  },
  {
    name: 'Testing'
  },
  {
    name: 'Inspection'
  },
  {
    name: 'Comprehension'
  },
  {
    name: 'Debugging'
  },
  {
    name: 'Design'
  },
  
]

const temporalMeasurementMethodData: Prisma.TemporalMeasurementMethodCreateInput[] = [
  {
    name: 'Form'
  },
  {
    name: 'Automatic tool'
  },
  {
    name: 'Experimenter'
  },
  {
    name: 'Tool and Participant'
  },
  {
    name: 'Experimenter and Participant'
  },
  {
    name: 'Not clearly defined'
  }
  
]

const subjectiveMeasurementMethodData: Prisma.SubjectiveMeasurementMethodCreateInput[] = [
  {
    name: 'Pen-and-paper questionnaire'
  },
  {
    name: 'Electronic questionnaire'
  },
  {
    name: 'Report'
  },
  {
    name: 'Interview'
  }
  
]

const measuringOutcomesData: Prisma.MeasuringOutcomeCreateInput[] = [
  {
    name: 'Only Objective Measurement'
  },
  {
    name: 'Only Temporal Measurement'
  },
  {
    name: 'Only Subjective Measurement'
  },
  {
    name: 'Objective and Temporal Measurement'
  },
  {
    name: 'Subjective and Temporal Measurement'
  },
  {
    name: 'Others'
  }
  
]

const codingExperimentSupportData: Prisma.CodingExperimentSupportCreateInput[] = [
  {
    name: 'Specific software tools'
  },
  {
    name: 'Integrated Development Environment (IDE)'
  },
  {
    name: 'Integrated with Solution'
  },
  {
    name: 'Virtual operating system'
  },
  {
    name: 'Screen-Recorder'
  },
  {
    name: 'Tool to support SE experiments'
  }
  
]

async function main() {
  console.log(`Start seeding ...`)

  for (const u of guidelineData) {
    const guideline = await prisma.guideline.create({
      data: u,
    })
    console.log(`Created Guideline with id: ${guideline.id}`)
  }

  for (const u of recruitingStrategyData) {
    const recruitingStrategy = await prisma.recruitingStrategy.create({
      data: u,
    })
    console.log(`Created recruitingStrategy with id: ${recruitingStrategy.id}`)
  }

  for (const u of designTypeData) {
    const designType = await prisma.designType.create({
      data: u,
    })
    console.log(`Created designType with id: ${designType.id}`)
  }

  for (const u of measuringOutcomesData) {
    const measuringOutcome = await prisma.measuringOutcome.create({
      data: u,
    })
    console.log(`Created designType with id: ${measuringOutcome.id}`)
  }

  for (const u of temporalMeasurementMethodData) {
    const temporalMeasurementMethod = await prisma.temporalMeasurementMethod.create({
      data: u,
    })
    console.log(`Created designType with id: ${temporalMeasurementMethod.id}`)
  }

  for (const u of subjectiveMeasurementMethodData) {
    const subjectiveMeasurementMethodData = await prisma.subjectiveMeasurementMethod.create({
      data: u,
    })
    console.log(`Created designType with id: ${subjectiveMeasurementMethodData.id}`)
  }

  for (const u of subjectiveMeasurementMethodData) {
    const subjectiveMeasurementMethodData = await prisma.subjectiveMeasurementMethod.create({
      data: u,
    })
    console.log(`Created designType with id: ${subjectiveMeasurementMethodData.id}`)
  }

  for (const u of codingExperimentSupportData) {
    const subjectiveMeasurementMethodData = await prisma.codingExperimentSupport.create({
      data: u,
    })
    console.log(`Created designType with id: ${subjectiveMeasurementMethodData.id}`)
  }

  
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })