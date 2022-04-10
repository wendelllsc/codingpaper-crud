import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
var cors = require('cors')
var bodyParser = require('body-parser')

const prisma = new PrismaClient()
const app = express()

var router = express.Router();


// Create/Edit codingPaper
router.post(`/codingpaper`, async (req, res) => {
  console.log(req.body)
  const { description , designTypes, measuringOutcomes, timeMeasurementMethods , codingExperimentSupport, subjectiveMeasurementMethods, guidelines , title, hasProfessionals, hasStudents , isReplicable, recruitingStrategies, tagsCharacterization, experimentalSetting ,taskDesignTypesTags} = req.body
 
  const guidelineData = guidelines?.map((method:any) => {
    return {  id : method.id};
  })
  const recruitingStrategiesData = recruitingStrategies?.map((method:any) => {
    return {  id : method.id};
  })

  const tagsCharacterizationData = tagsCharacterization?.map((method:any) => {
    return {  name : method};
  })

  const taskDesignTypesTagsData = taskDesignTypesTags?.map((method:any) => {
    return {  name : method};
  })

  const designTypesData = designTypes?.map((method:any) => {
    return {  id : method.id};
  })

  const measuringOutcomesData = measuringOutcomes?.map((method:any) => {
    return {  id : method.id};
  })

  const timeMeasurementMethodData = timeMeasurementMethods?.map((method:any) => {
    return {  id : method.id};
  })

  const subjectiveMeasurementMethodData = subjectiveMeasurementMethods?.map((method:any) => {
    return {  id : method.id};
  })

  const codingExperimentSupportData = codingExperimentSupport?.map((method:any) => {
    return {  id : method.id};
  })

  const experimentalSettingsData = experimentalSetting?.map((method:any) => {
    return {  id : method.id};
  })
  const sampleSize = parseInt(req.body.sampleSize);
  const taskDuration = parseInt(req.body.taskDuration);
try{
  const result = await prisma.codingPaper.create({
    data: {
      title,
      description,
      hasStudents,
      hasProfessionals,
      sampleSize,
      taskDuration,
      isReplicable,
      guidelines: {
        connect: guidelineData
      },
      sampleRecruitments: {
        connect: recruitingStrategiesData
      },
      designTypes: {
        connect: designTypesData
      },
      measuringOutcomes: {
        connect: measuringOutcomesData
      },
      timeMeasurementMethods: {
        connect: timeMeasurementMethodData
      },
      subjectiveMeasurementMethods: {
        connect: subjectiveMeasurementMethodData
      },
      codingExperimentSupport: {
        connect: codingExperimentSupportData
      },
      sampleTags: {
        create: tagsCharacterizationData
      },
      taskDesignTags: {
        create: taskDesignTypesTagsData
      },
      experimentalSetting: {
        connect: experimentalSettingsData
      }
    },
  })

  res.json(result)
}catch (e){
  // res.json(e)
}
  // const result = await prisma.codingPaper.create({
  //   data: {
  //     title,
  //     description,
  //     researchMethods: {
  //       connect: methodData
  //     },
  //   },
  // })
 
})


router.post(`/searchCodingpapers`, async (req, res) => {
  const { description , designTypes, measuringOutcomes, timeMeasurementMethods , codingExperimentSupport, subjectiveMeasurementMethods, guidelines , title, hasProfessionals, hasStudents , isReplicable, recruitingStrategies, tagsCharacterization, experimentalSetting ,taskDesignTypesTags} = req.body
  console.log(req.body)
  let sampleSize = parseInt(req.body.sampleSize);

  let timeMeasurementMethodsData: any[] = []
  timeMeasurementMethods?.map((method:any) => {
    timeMeasurementMethodsData.push(method.id);
  })

  let subjectiveMeasurementMethodsData: any[] = []
  subjectiveMeasurementMethods?.map((method:any) => {
    subjectiveMeasurementMethodsData.push(method.id);
  })

  let recruitingStrategiesData: any[] = []
  recruitingStrategies?.map((method:any) => {
    recruitingStrategiesData.push(method.id);
  })

  let designTypesData: any[] = []
  designTypes?.map((method:any) => {
    designTypesData.push(method.id);
  })
  

  let guidelineData: any[] = []
  guidelines?.map((method:any) => {
    guidelineData.push(method.id);
  })

  let experimentalSettingData: any[] = []
  experimentalSetting?.map((method:any) => {
    experimentalSettingData.push(method.id);
  })

  let measuringOutcomesData: any[] = []
  measuringOutcomes?.map((method:any) => {
    measuringOutcomesData.push(method.id);
  })

  let busca =  {
    where: {  
    },
  }

  if(title != undefined && title != null && title != ""){
    Object.assign(busca.where, {title: {
      contains:title
      }})
  }

  if(description != undefined && description != null && description != ""){
    Object.assign(busca.where, {description: {
      contains:description
      }})
  }

  if(sampleSize != undefined && sampleSize != null && sampleSize > 0){
    Object.assign(busca.where, {sampleSize: {
        lte:sampleSize
      }})
  }

  if(recruitingStrategiesData.length > 0 ){
    Object.assign(busca.where, {sampleRecruitments: {
      some:{
        id:{
          in : recruitingStrategiesData
        }
      }
      }})
  }

  if(guidelineData.length > 0 ){
    Object.assign(busca.where, {guidelines: {
      some:{
        id:{
          in : guidelineData
        }
      }
      }})
  }

  if(tagsCharacterization.length > 0 ){

    let OR = [{}]
    
    for(let i = 0; i < tagsCharacterization.length; i++){
        let val = tagsCharacterization[i];
        let object = {
          sampleTags: {
            some:{
              name: {
                contains : val
              }
            }
          }
        }
        OR.push(object)
    }
    Object.assign(busca.where, {OR})
  }
  
  if(hasStudents){
    Object.assign(busca.where, {hasStudents: hasStudents})
  }

  if(isReplicable){
    Object.assign(busca.where, {isReplicable: isReplicable})
  }

  if(hasProfessionals){
    Object.assign(busca.where, {hasProfessionals: hasProfessionals})
  }

  if(designTypesData.length > 0 ){
    Object.assign(busca.where, {designTypes: {
      some:{
        id:{
          in : designTypesData
        }
      }
      }})
  }

  if(taskDesignTypesTags.length > 0 ){
    let OR = [{}]
    for(let i = 0; i < taskDesignTypesTags.length; i++){
        let val = taskDesignTypesTags[i];
        let object = {
          taskDesignTags: {
            some:{
              name: {
                contains : val
              }
            }
          }
        }
        OR.push(object)
    }
    Object.assign(busca.where, {OR})
  }

  if(experimentalSettingData.length > 0 ){
    Object.assign(busca.where, {experimentalSetting: {
      some:{
        id:{
          in : experimentalSettingData
        }
      }
      }})
  }

  if(measuringOutcomesData.length > 0 ){
    Object.assign(busca.where, {measuringOutcomes: {
      some:{
        id:{
          in : measuringOutcomesData
        }
      }
      }})
  }

  if(timeMeasurementMethodsData.length > 0 ){
    Object.assign(busca.where, {timeMeasurementMethods: {
      some:{
        id:{
          in : timeMeasurementMethodsData
        }
      }
      }})
  }

  if(subjectiveMeasurementMethodsData.length > 0 ){
    Object.assign(busca.where, {subjectiveMeasurementMethods: {
      some:{
        id:{
          in : subjectiveMeasurementMethodsData
        }
      }
      }})
  }

  
  
  console.log(busca);
  
  let result = []
  result = await prisma.codingPaper.findMany(busca);

  if(result.length <= 0 ){
    console.log("registros não encontrados");
  }
  res.json(result)
  
})


router.post(`/addGuideline`, async (req, res) => {
  console.log(req.body)
  const { title , author } = req.body
try{
  const result = await prisma.guideline.create({
    data: {
      title,
      author
    }
  })
  res.json(result)
}catch (e){
  res.json(e)
}

 
})

app.get(`/codingpaper/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params

  const post = await prisma.codingPaper.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

//FetchService
router.get('/codingPaper', async (req, res) => {
  const codingPapers = await prisma.codingPaper.findMany()
  res.json(codingPapers)
})

router.get('/guidelines', async (req, res) => {
  const guidelines = await prisma.guideline.findMany()
  res.json(guidelines)
})

router.get('/recruitingStrategies', async (req, res) => {
  const recruitingStrategies = await prisma.recruitingStrategy.findMany()
  res.json(recruitingStrategies)
})

router.get('/designTypes', async (req, res) => {
  const designTypes = await prisma.designType.findMany()
  res.json(designTypes)
})

router.get('/measuringOutcomes', async (req, res) => {
  const measuringOutcomes = await prisma.measuringOutcome.findMany()
  res.json(measuringOutcomes)
})

router.get('/timeMeasurementMethods', async (req, res) => {
  const timeMeasurementMethodsD = await prisma.temporalMeasurementMethod.findMany()
  res.json(timeMeasurementMethodsD)
})

router.get('/subjectiveMeasurementMethods', async (req, res) => {
  const subjectiveMeasurementMethodD = await prisma.subjectiveMeasurementMethod.findMany()
  res.json(subjectiveMeasurementMethodD)
})

router.get('/codingExperimentSupports', async (req, res) => {
  const codingExperimentSupports = await prisma.codingExperimentSupport.findMany()
  res.json(codingExperimentSupports)
})

router.get('/experimentalSettings', async (req, res) => {
  const experimentalSettingsData = await prisma.experimentalSetting.findMany()
  res.json(experimentalSettingsData)
})





//FIM FetchService


// FIM
app.use(cors())
app.use(bodyParser.json())
app.use('/api/v1', router)


// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(result)
// })

// app.put('/post/:id/views', async (req, res) => {
//   const { id } = req.params

//   try {
//     const post = await prisma.post.update({
//       where: { id: Number(id) },
//       data: {
//         viewCount: {
//           increment: 1,
//         },
//       },
//     })

//     res.json(post)
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` })
//   }
// })

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params

//   try {
//     const postData = await prisma.post.findUnique({
//       where: { id: Number(id) },
//       select: {
//         published: true,
//       },
//     })

//     const updatedPost = await prisma.post.update({
//       where: { id: Number(id) || undefined },
//       data: { published: !postData?.published },
//     })
//     res.json(updatedPost)
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` })
//   }
// })

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(post)
// })

// app.get('/users', async (req, res) => {
//   const users = await prisma.user.findMany()
//   res.json(users)
// })

// app.get('/user/:id/drafts', async (req, res) => {
//   const { id } = req.params

//   const drafts = await prisma.user
//     .findUnique({
//       where: {
//         id: Number(id),
//       },
//     })
//     .posts({
//       where: { published: false },
//     })

//   res.json(drafts)
// })

// app.get(`/post/:id`, async (req, res) => {
//   const { id }: { id?: string } = req.params

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   })
//   res.json(post)
// })

// app.get('/feed', async (req, res) => {
//   const { searchString, skip, take, orderBy } = req.query

//   const or: Prisma.PostWhereInput = searchString
//     ? {
//         OR: [
//           { title: { contains: searchString as string } },
//           { content: { contains: searchString as string } },
//         ],
//       }
//     : {}

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy as Prisma.SortOrder,
//     },
//   })

//   res.json(posts)
// })

const server = app.listen(8080, () =>
  console.log(`🚀 Server ready at: http://localhost:8080`),
)