"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon,DownloadIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PDFViewer } from '@react-pdf/renderer';


export default function Page() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [courseContent, setCourseContent] = React.useState([
    {
        id: 1,
        title: "Course Content 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nisi soluta aspernatur consectetur neque molestias nobis reiciendis cum. Qui tempore accusamus placeat laudantium sed...."

    },
    {
        id: 2,
        title: "Course Content 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nisi soluta aspernatur consectetur neque molestias nobis reiciendis cum. Qui tempore accusamus placeat laudantium sed...."
    }
  ]);

  const [contentName, setContentName] = React.useState("");
    const [contentDescription, setContentDescription] = React.useState("");

    const addToList = () => {
        setCourseContent([
            ...courseContent,
            {
                id: courseContent.length + 1,
                title: contentName,
                description: contentDescription
            }
        ]);
        setOpen(false);
        }

  

  return (
    <>
      <Navbar />
      <div className="course-container flex flex-col w-11/12 h-fit mx-auto">
        <div className="course-header flex justify-between items-center w-full h-20 bg-white">
          <h1 className="text-2xl font-bold p-4">
            Course Name
            <span className="text-lg font-normal"> - Course Code</span>
          </h1>
          <div className="flex space-x-4 p-4">
            <Button variant="outline" onClick={() => setOpen(true)}>
              Add Content
            </Button>
          </div>
        </div>
        <div className="course-content flex w-full h-fit ">
          <div className="course-sidebar w-1/5 h-full m-2  p-4 select-none">
            <h2 className="text-xl font-bold my-2">Content</h2>
            <ul className="space-y-2">
                {courseContent.map((content) => (
              <li
              key={content.id}
              className="text-lg  p-5 flex flex-col rounded-sm shadow-md transition-all cursor-pointer duration-300 hover:bg-gray-100">
                {content.title}
                <span className="text-sm font-normal my-2">{
                    content.description.slice(0, 50)
                }</span>
              </li>
                ))}
              
            </ul>
            
           


          </div>
          <div className="course-main w-4/5 h-full bg-white p-4">
            <div className="w-full flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Course Content 1</h2>
              <Button 
                onClick={() => setEditOpen(true)}
              >Edit</Button>
            </div>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4 w-full">
                <h4 className="text-sm font-semibold">Course Content 1</h4>
                <div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                  
                </CollapsibleTrigger>
                <Button variant="ghost" size="sm">
                    <DownloadIcon className="h-4 w-4" />
                </Button>
                </div>
              </div>

              {!isOpen && (
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt nisi soluta aspernatur consectetur neque molestias
                  nobis reiciendis cum. Qui tempore accusamus placeat laudantium
                  sed....
                </div>
              )}
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum est sunt mollitia at, temporibus fuga dolores! Id, vero ea? Incidunt, odit! Harum quia dolorum perspiciatis quos ea impedit, velit necessitatibus.
                 Corporis nam architecto aut quae nisi quos obcaecati sed molestiae ullam ipsum, doloremque vero mollitia optio quidem, veniam vitae quasi quis consequuntur inventore. Fugiat, nihil quisquam laboriosam repellat sunt molestias.
                 Doloremque eaque et harum velit ipsam ducimus odio animi, veniam saepe beatae deleniti tempore, esse aliquam, laboriosam magnam sequi eveniet blanditiis dolores facilis sapiente! Ea fugit amet inventore eum id?
                 Ducimus, praesentium voluptatum. Accusantium molestiae sint placeat est. Voluptate autem consequuntur alias vitae perferendis explicabo nostrum quae mollitia. Adipisci aut velit ratione tenetur reiciendis id facilis accusantium temporibus natus placeat!
                 Soluta necessitatibus placeat voluptatem accusamus velit libero totam deleniti quas enim temporibus impedit aut, ex provident consequuntur repudiandae. Magni fugit quasi corporis porro laborum deleniti pariatur unde, dolorum asperiores similique!
                 Quis, illo odio! Ab minus facilis repellendus modi beatae, qui delectus nisi dicta labore amet a, commodi ea maxime quas asperiores, doloribus cumque sunt consectetur ullam? Voluptatibus sed cumque temporibus!
                 At, perspiciatis iste, aliquam dolor distinctio esse commodi omnis ipsam consequuntur earum culpa praesentium aperiam harum explicabo ex dolorum quaerat labore fugit adipisci dolore! Delectus accusantium dignissimos consequuntur nobis totam!
                 Delectus blanditiis pariatur amet velit quibusdam, unde consectetur ullam odio, libero earum quam eveniet fuga provident assumenda veritatis quisquam culpa dolorum officiis? Nam, commodi voluptate rerum dolore nesciunt animi fugiat?
                 Itaque vero eveniet optio impedit molestiae id quia esse sunt facilis possimus provident sed necessitatibus delectus vel excepturi labore quisquam omnis nostrum, illum pariatur expedita aperiam nobis dolores officiis? Unde.
                 Ipsa dolore veniam similique incidunt hic nesciunt necessitatibus laudantium enim numquam cum, iure error esse nobis nam dolorum tempora cumque iusto magni natus obcaecati est, odit a asperiores! Facere, quod.
                 Blanditiis et iste obcaecati expedita earum nam ducimus cumque eaque impedit, est unde similique sunt quos neque deleniti non harum repellendus. Id eligendi voluptatibus impedit tempore in temporibus architecto sed.
                 Dolores blanditiis assumenda repudiandae vitae expedita nemo nisi quos dignissimos. Vel cumque sit omnis atque officiis, quia quisquam praesentium quasi molestiae accusantium rem corrupti recusandae sunt ullam qui asperiores deserunt.
                 Saepe suscipit, possimus iste vitae nihil ipsa quod nulla provident quo adipisci numquam laudantium facere molestias. Voluptatibus doloremque excepturi, officiis corrupti autem aperiam? At saepe recusandae eligendi repellendus esse adipisci!
                 Sed quod molestias voluptas quas vero. Pariatur vitae suscipit sunt quidem cum debitis ullam velit labore fugit iure? Porro veniam quaerat numquam accusamus sed alias cumque! Veniam itaque repellendus dolorum.
                 Necessitatibus molestias, maxime officia repellendus alias tempore incidunt distinctio explicabo voluptas dolorem provident aliquam dolorum magnam unde sit fuga ipsam ipsum earum soluta, veritatis, deleniti aut similique optio. Debitis, est?
                 Impedit hic laudantium atque inventore quod nulla tempore placeat ex aspernatur libero quo iusto eaque ipsum itaque facere non quidem voluptates, architecto saepe quaerat reiciendis eum tenetur quia! Sunt, voluptatem.
                 Ut hic laborum quia temporibus, molestias neque earum eos quos itaque maiores dignissimos aliquid fugit voluptatem exercitationem ullam culpa inventore atque totam maxime facere doloribus nesciunt expedita perferendis? Pariatur, nisi.
                 Doloremque voluptate dolore, vero ipsa magni sed totam corrupti explicabo incidunt harum corporis repellendus architecto perspiciatis ipsam fugit quas amet nisi alias nam? Dolores error molestiae, et eaque non nisi.
                 Optio dolorum mollitia, placeat odio eius molestias, ipsum architecto iusto, saepe fugit reprehenderit dignissimos! Amet molestiae doloribus eveniet deserunt! Obcaecati dolorum harum facilis doloribus cum. Quaerat, dolorum doloremque. Delectus, non?
                 Adipisci aut tempore animi. Illum ex incidunt, aut in similique earum, at nostrum, vitae repudiandae harum quod alias placeat deleniti omnis hic! Sint nesciunt dolorem alias cupiditate temporibus quaerat consequatur.
                 Distinctio accusantium alias cum vel? Nobis consequuntur quo similique nam. Architecto unde cumque earum voluptatem, molestias sapiente illo rerum, nulla dolorum id explicabo mollitia sunt minus rem harum numquam corporis.
                 Deleniti consectetur ipsa facilis, eos totam, quas quod odio aliquam doloremque sunt debitis aliquid repudiandae animi? Hic animi, pariatur ut nesciunt iure cupiditate aperiam voluptas sapiente eum dignissimos in recusandae!
                 Sapiente, hic eaque vel similique aspernatur itaque voluptatibus ea. Impedit explicabo fugit recusandae accusamus, laborum distinctio quos soluta fugiat laboriosam ut praesentium, omnis eaque porro quaerat sunt tempore vel. Velit!
                 Dolores quo mollitia optio? Pariatur earum aliquid vero cupiditate accusantium corporis quis dolorem dolore, sint voluptates ab consectetur, delectus quam iste vel saepe officia dicta quod minima iure ex animi.
                 Ut eum similique iure voluptatum voluptatem corporis quasi illum eius soluta, tempore, optio nesciunt id aperiam ea minus saepe sequi esse labore? Deserunt tempora sequi rerum veniam accusantium harum delectus?
                 Quas ratione accusamus nesciunt temporibus adipisci qui error atque. Iusto officia magni illum ad sed excepturi nulla. Vero eveniet dignissimos error placeat at? Cumque asperiores dolor minima soluta, saepe numquam.
                 Quisquam, doloremque. Minima ullam accusamus sit provident fuga consequatur dicta modi soluta omnis recusandae eum velit aperiam, obcaecati ratione expedita porro aspernatur blanditiis nesciunt nobis exercitationem tenetur cupiditate explicabo. Reiciendis.
                 Voluptates, adipisci impedit? Animi blanditiis dolores ipsam voluptatibus possimus, fugit ducimus perferendis illum commodi facilis nesciunt, reiciendis nemo. Fugiat fuga omnis minima fugit minus eaque in, qui nesciunt facilis harum.
                 Soluta earum nobis expedita quisquam, tenetur omnis fuga velit quod ullam obcaecati, eaque cum illum impedit consectetur non autem quo voluptate dolor ad aperiam perspiciatis quidem distinctio? Quis, sequi odio.
                 Delectus hic libero ducimus odit dignissimos quae expedita vel mollitia sint id aspernatur minima possimus soluta similique sed, minus perspiciatis corporis eius commodi? At quo, reprehenderit doloremque ab repellendus consequatur.
                 Tempora quae, cum magnam quas fuga assumenda maxime blanditiis sapiente temporibus soluta minus repudiandae dolorem obcaecati delectus sit architecto ipsum nulla inventore, repellat quo, iure non in. Corporis, placeat eius.
                 Quisquam illum laudantium odit quaerat facilis vel ea incidunt, quod dolorum beatae doloribus veniam accusantium nemo minus autem tempore sed aliquid consequatur maiores architecto soluta enim. Est officiis illo ullam.
                 Quis modi quaerat corrupti, aut laboriosam maiores aliquid ducimus aliquam voluptates fugiat quae, asperiores perferendis distinctio voluptatem. Recusandae iure, at laboriosam iusto inventore dolores nobis est illum ab? Suscipit, totam.
                 Voluptatibus dolorem reprehenderit cupiditate perspiciatis. Temporibus cupiditate deserunt eveniet similique doloremque eaque dolor assumenda est rem porro odit inventore aspernatur illum accusantium ut sunt mollitia ex aperiam numquam, molestias nobis!
                 Voluptate culpa esse molestiae ullam eius placeat adipisci blanditiis suscipit cupiditate, exercitationem, eos temporibus porro reiciendis odio consequuntur pariatur numquam deleniti dolor qui unde et dolorem, sequi iste nulla? Nam?
                 Nulla suscipit enim illo iure ex magnam eligendi optio! Explicabo inventore itaque recusandae praesentium accusantium nemo, quasi distinctio quis amet aut fuga dolore sunt, vero velit hic adipisci aspernatur beatae.
                 Ratione dicta placeat ab iure distinctio excepturi asperiores sit eveniet quos, molestias numquam amet dolore illo sint maiores et facere esse ipsam nihil. Eum, maxime excepturi. Esse sunt itaque libero.
                 Perferendis, deserunt dolor perspiciatis, veritatis ex ipsa inventore doloribus omnis, illum repudiandae praesentium amet eos minima voluptates fuga vitae qui sequi voluptatem pariatur accusamus. Et ducimus recusandae sint repellendus quae!
                 Fugit quia culpa blanditiis id quasi nostrum? Neque dolor accusamus quia, dignissimos, labore odio quidem sequi animi porro, facere consequatur. Et sit repudiandae esse nihil, possimus a cumque magni modi.
                 A deserunt expedita ex optio, amet nobis officiis vel! Inventore molestias at quia perferendis, totam velit odio eveniet hic asperiores. Ducimus fuga iste est architecto officiis fugit deleniti saepe expedita.
                 Iste unde, eaque nostrum quos voluptate quidem hic enim aliquid sunt. Officiis praesentium inventore quisquam eaque repellat mollitia voluptates. Et quidem saepe recusandae dicta esse officia necessitatibus neque voluptates ut?
                 Totam iure dolorum accusamus quo dignissimos consequuntur saepe cumque pariatur voluptas quasi. Deserunt consectetur sunt a maxime suscipit. Quasi soluta eligendi cum eaque placeat fuga maxime et fugit possimus neque?
                 Modi provident, fugiat error quas sint a ab vel aperiam fugit, perferendis quidem ipsam et, aliquam similique accusantium voluptatibus reiciendis quibusdam. Maiores numquam nam impedit amet corrupti, sapiente beatae repellendus!
                 Earum, voluptate distinctio, ullam necessitatibus eum incidunt possimus quia a repellat quam consequatur. Quas esse suscipit laborum consequatur excepturi voluptas porro sunt quis fuga natus quam libero perferendis, ratione vitae.
                 Pariatur aspernatur explicabo quasi voluptatem harum atque neque in cum illum. Perferendis assumenda eligendi sed? Molestiae asperiores eaque amet dolores esse, natus magnam! Aliquam repellat sint praesentium illo saepe commodi.
                 Officia sint, eos deleniti id ratione, tenetur aspernatur minus, a sequi nostrum eaque maxime. Provident ad molestias nobis ipsum dolor, animi saepe voluptatibus! Excepturi temporibus asperiores autem soluta reiciendis dolor.
                 Animi cum non fugiat debitis voluptate totam facere adipisci? Rem ipsum, fugiat vitae corporis, rerum eos dignissimos accusamus suscipit alias tenetur soluta eaque tempora nobis commodi ullam quibusdam doloribus enim!
                 Amet exercitationem alias repudiandae excepturi natus repellat dolor omnis ea consequatur perspiciatis quibusdam beatae quia quas dolorem minima ut delectus, unde maxime ullam tempore accusantium magnam. Minima quia error aspernatur!
                 Soluta necessitatibus quia maxime, cupiditate quos ducimus voluptas fugit cum et perspiciatis odit suscipit eum. Vitae laborum repellat debitis ipsam mollitia, itaque totam nemo vero sed sapiente expedita fugiat? Sint?
                 Officiis perspiciatis repudiandae odio et animi iure provident esse, quibusdam rem dicta veniam error tempore eaque aliquid eveniet quisquam. Possimus tenetur veritatis sequi ut officia rerum architecto odio inventore excepturi.
                 Minima, excepturi quo eos incidunt reiciendis officia, necessitatibus non distinctio praesentium repellat suscipit laudantium corporis velit molestiae quasi, architecto voluptatum minus dolor. Repudiandae nisi commodi quae qui quas, porro beatae!
                 Accusantium itaque, est modi asperiores odio provident. Reiciendis accusamus sed laborum atque praesentium nesciunt, error, ipsa assumenda recusandae natus quo minus. Voluptatem velit eum dolores illo commodi, animi ipsam obcaecati!
                 Non perferendis sapiente numquam ipsa id, ullam ipsum blanditiis cum explicabo ad, molestiae ratione tenetur cupiditate qui provident fuga, earum veniam cumque eius dignissimos. Id explicabo voluptatibus nihil quis. Quis.
                 Facilis nisi culpa nobis minus delectus ratione, porro nihil, cupiditate corrupti rerum totam. Explicabo, officia quod id est obcaecati voluptatem perferendis eos laborum pariatur expedita architecto veniam. Accusantium, tempore tenetur?
                 Magni quia natus eius, cumque quaerat iste vel temporibus minus qui? Aspernatur rerum et similique dolores, tempora optio corporis accusamus. Doloremque ullam ex optio, obcaecati reiciendis aliquam praesentium quos debitis.
                 Aliquam, labore sequi, quam ipsa quidem ipsam fugiat pariatur omnis non deleniti iste. Ea eligendi eum molestias totam fuga laborum temporibus esse numquam doloribus necessitatibus nostrum iusto aperiam, quisquam vero?
                 Perspiciatis distinctio similique officia ipsum asperiores praesentium sequi deserunt harum voluptatibus, consequatur nisi ipsam corrupti rem obcaecati fugiat soluta accusamus alias. Atque rerum maxime molestiae unde magnam modi, laborum ab.
                 Esse, nulla? Non, harum culpa ad fuga accusantium at rerum repellendus libero ab quibusdam eaque, itaque obcaecati quaerat doloribus repellat deleniti voluptates maiores dicta iste! Harum, nulla. Inventore, omnis culpa!
                 Dicta totam, enim, doloribus minus ad alias consectetur esse nemo hic molestiae similique facere nisi rerum eveniet animi officia, tenetur amet mollitia deserunt nesciunt illo deleniti sit provident repudiandae? Architecto.
                 Hic sapiente earum dicta praesentium. Est ipsa sequi rem neque aut totam eum odio. Iste assumenda, mollitia laudantium officia facilis iusto eos veniam excepturi optio voluptate. Perspiciatis dolorem incidunt atque!
                 Porro officiis quas libero repellat asperiores molestias quo facilis cum enim. Velit sit tempore expedita deserunt cumque accusantium maiores natus autem alias ipsum aperiam, eius quia veniam quisquam nemo vitae!
                 Tempora nemo nesciunt natus, ratione qui ea rem error veniam soluta blanditiis voluptate, commodi explicabo vitae! Consequuntur quae voluptatibus quam quidem in, consectetur quos libero sequi officia eveniet unde molestiae!
                 Fuga animi distinctio repudiandae reprehenderit labore consectetur beatae deleniti facere vitae expedita voluptatem, dolore qui molestiae! Temporibus, fuga facilis iusto tempora beatae tenetur, quam numquam, esse reprehenderit consequuntur impedit ab.
                 Dolores itaque sed possimus eligendi quaerat earum, iste harum a repellat voluptate nemo illo impedit, nesciunt voluptas porro et cum atque cumque? Quisquam eius consectetur eaque, nesciunt nobis perspiciatis aut.
                 Illum, cum? Odio beatae ducimus dignissimos animi et, qui aperiam, nam ea illum sit voluptates doloremque voluptatem molestias, sequi commodi aut delectus provident earum repellat perspiciatis voluptas ratione tempore libero!
                 Nisi repellat iste animi commodi mollitia possimus quia unde sint voluptatibus nesciunt. Praesentium ipsum doloribus molestiae voluptatibus a nesciunt officiis vitae eligendi magnam rem, ea voluptatum minus unde nisi autem.
                 Earum deserunt, tempore fuga ducimus nostrum commodi necessitatibus fugiat explicabo cum temporibus tenetur quis! Quo omnis facilis, laborum vitae mollitia officia, officiis esse non inventore, adipisci ducimus numquam vel corporis?
                 Reprehenderit iusto architecto ullam suscipit porro sunt, fuga, nulla dignissimos pariatur repellendus voluptatem impedit! Laborum nulla consequuntur fuga assumenda eveniet dolor fugit perspiciatis blanditiis! Excepturi dignissimos sed porro sequi dolorem?
                 Quis omnis alias quo, necessitatibus veritatis, cum optio incidunt odit dolor itaque nihil a perferendis tenetur ullam. Placeat tenetur distinctio, saepe possimus cupiditate accusantium totam explicabo asperiores quam doloribus quas!
                 Quasi nemo placeat obcaecati! Aspernatur ducimus odio facere. Ad aperiam officiis facere molestias labore dignissimos? Doloribus, ullam cum adipisci quidem fugiat eveniet quae, laboriosam eaque quasi, mollitia delectus fugit distinctio.
                 Quia enim laudantium aliquid, ab perferendis mollitia voluptatum eaque, vel ipsum minus harum temporibus iusto ipsam tenetur dolorem at itaque nemo deserunt sunt perspiciatis non deleniti laboriosam possimus facere? Aliquid.
                 Voluptas modi obcaecati recusandae saepe, excepturi in vel ratione inventore cumque officiis, iure repudiandae. Dolorem sapiente debitis tempore reprehenderit consequatur error perspiciatis at totam mollitia itaque, reiciendis praesentium vel suscipit.
                 Laudantium, nemo dignissimos. Repudiandae ut culpa libero esse modi beatae exercitationem, tempore possimus mollitia officiis, at nesciunt aut consequuntur laudantium vero amet? Libero eos nostrum recusandae aliquam quibusdam minima inventore!
                 Natus possimus iure laudantium sed corporis hic impedit, numquam porro repellendus ea quas aliquam id itaque, illo eos molestias! Labore fugiat libero explicabo suscipit quod consequuntur, officiis perspiciatis nobis doloremque?
                 Similique neque eligendi recusandae velit veniam explicabo fugiat maxime temporibus, rem repellat saepe nulla esse eos nihil dolore fuga dolores sint ex itaque tempora numquam consectetur perspiciatis facilis corporis. Sit?
                 Ab molestiae dicta enim est repellendus ipsa a unde quis doloribus magnam ut animi nemo, dolorum ipsum laudantium voluptatem quibusdam mollitia illo porro, reprehenderit amet laboriosam! Modi quis harum perspiciatis.
                 Optio rerum dolore accusantium nemo a aliquid. Dicta ex harum perferendis impedit magnam ratione perspiciatis! Ipsum placeat rem, sed impedit aspernatur saepe sapiente repellat voluptates veritatis. Deserunt hic illo doloribus.
                 Temporibus illum doloribus earum minima id, vero error suscipit quasi at corporis odio molestias magni ex cupiditate voluptates nam accusamus impedit. Voluptate vero cumque dignissimos reiciendis est quos velit. Nesciunt.
                 Id vero amet sunt iusto error? Aliquam debitis a repellat minima, quae non blanditiis accusantium distinctio et. Vel ipsa sit, temporibus est doloribus aliquid sed tenetur officia consequatur, iure assumenda.
                 Eaque quis consequatur quos necessitatibus aspernatur autem mollitia accusantium pariatur illum. Animi, ab! Unde illo assumenda amet modi, neque accusantium quos ratione deserunt error asperiores laboriosam. Dignissimos animi consequatur tempora.
                 Asperiores veritatis alias neque consectetur quia odit reprehenderit possimus, debitis fuga dicta rerum? Placeat beatae quo consectetur odio velit. Ipsum quae non accusantium placeat error rem quisquam velit pariatur fugiat.
                 Recusandae, rem. Harum inventore repellat maiores libero similique doloribus itaque voluptatem magni quaerat dignissimos. Ratione, labore doloribus incidunt quaerat maiores numquam corporis, aut corrupti aliquam eveniet, magni in error nisi!
                 Nihil vero facere est id debitis a, pariatur asperiores exercitationem incidunt corporis nesciunt modi quia eius distinctio iure. Iure, inventore. Dolor fugit cupiditate eum accusantium ad impedit laboriosam, quod non!
                 At quisquam ea inventore quam voluptatibus delectus perspiciatis. Porro molestias, ea neque soluta laborum repellat libero natus maiores eos perferendis nam labore dolorem praesentium obcaecati accusamus a quam ut dolorum.
                 Ex dolore, vitae animi aut, incidunt esse modi odio et iusto nihil labore? Atque corporis, ipsum dolores quam asperiores tenetur sapiente magni dolor nisi nam excepturi consequuntur molestias unde magnam!
                 Dolorum totam nostrum aspernatur qui eveniet fugit, possimus ipsum provident suscipit doloribus voluptates! Tenetur et debitis temporibus repudiandae a culpa repellat maxime vel nihil eum nulla quis, assumenda harum dignissimos?
                 Eos itaque nobis sunt? Qui architecto quis amet facere alias laboriosam, fugiat voluptatum iusto facilis quasi earum totam consequatur optio quisquam at libero, iste autem blanditiis vero commodi illo. Blanditiis.
                 Nam, quam cum blanditiis ipsum iusto similique. Aspernatur, veniam numquam modi ipsam reprehenderit eaque quam ducimus ut magni distinctio sed quis minima nostrum! Ipsam magni accusamus fugit officia eum hic?
                 Illum repellat ipsum iure corporis. Aspernatur mollitia inventore sapiente esse iusto quis ab suscipit pariatur labore, voluptate a illo animi in sit architecto, maiores excepturi error, alias laboriosam. Reiciendis, ipsum?
                 Ipsa expedita, fuga cum ipsam ducimus rem delectus dolore, harum suscipit fugit incidunt nobis quidem nesciunt ea! Maiores cum, dolores sapiente ipsum voluptatibus sit porro tenetur laudantium fuga modi quia.
                 Laborum perferendis quae eveniet itaque dolorum sapiente ut voluptatibus perspiciatis maiores. Labore vel magnam obcaecati suscipit veniam, voluptates cupiditate ex adipisci? Nam iusto porro iste dignissimos necessitatibus obcaecati repellendus deleniti!
                 Maiores nobis tempora fugiat. Ipsa nam sequi saepe quidem vitae reiciendis soluta id doloremque possimus provident architecto asperiores vel laboriosam veniam quibusdam aliquam tempore quas iusto, dolor magni voluptatibus quo.
                 Eius, deleniti fugiat molestias id aut quaerat veniam ducimus obcaecati quas eligendi porro expedita veritatis quisquam autem saepe minima illum voluptatum architecto adipisci optio. Et repudiandae tenetur sit soluta error!
                 Perferendis saepe modi porro nesciunt quis. Impedit veniam nam alias, consequuntur, illum perspiciatis dignissimos in velit quos dolorem maxime accusantium ipsam similique eligendi vitae, sint quam aut iste fugit amet?
                 Voluptas quisquam cupiditate facilis consectetur quibusdam rem doloribus nemo! Possimus illo error incidunt, ipsam sed quasi? Ex aperiam sint maxime sit nihil nisi, laborum alias magnam temporibus. Corrupti, quasi eos.
                 Dolores quia cumque nobis quidem obcaecati, impedit molestiae aliquid adipisci dicta ad provident pariatur et explicabo vitae voluptates, veniam, voluptatum minima illo dolor incidunt alias. Error provident ut at quaerat.
                 Blanditiis delectus architecto vitae doloribus optio sunt recusandae aspernatur natus. Suscipit hic adipisci minima! Sed eveniet sint nostrum excepturi enim, qui reiciendis! Adipisci sapiente praesentium quidem asperiores quas eveniet illum.
                 Consectetur repellendus quas itaque libero tempora et eligendi ipsam voluptatibus. Repellat sequi possimus blanditiis rem sint hic repudiandae nobis. Impedit, provident in ab vero repudiandae numquam porro fuga iusto iure.
                 Ullam ea voluptates eveniet. At, est. Ut recusandae fugiat quas quo atque veritatis voluptate voluptas? Aperiam odio delectus ut totam. Nulla recusandae, at quaerat porro omnis fugiat voluptatum neque molestiae?
                 Voluptatem illum, alias repellendus numquam autem vero optio asperiores laudantium sint deserunt veritatis voluptas debitis, ea quam dolores voluptates dignissimos, eveniet corporis recusandae. Libero eum cupiditate voluptatum esse debitis voluptatibus!
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>

      {addCourseDialog()}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Content</DialogTitle>
            <DialogDescription>Edit your course content</DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Content Name</Label>
              <Input id="name" placeholder="Title of your content" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Content Description</Label>
              <Input id="description" placeholder="Description" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Upload File</Label>
              <Input type="file" id="file" placeholder="Upload File" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );

  function addCourseDialog() {
    return <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Course Content</DialogTitle>
          <DialogDescription>Add content to your course</DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Content Name</Label>
            <Input id="name" placeholder="Title of your content" value={contentName}
              onChange={(e) => setContentName(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Content Description</Label>
            <Input id="description" placeholder="Description" value={contentDescription}
              onChange={(e) => setContentDescription(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Upload File</Label>
            <Input type="file" id="file" placeholder="Upload File" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            addToList();
            setOpen(false);
            setContentName("");
            setContentDescription("");

          } }>Add Content</Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>;
  }
}
