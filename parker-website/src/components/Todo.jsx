import React, { Component } from "react";
import Nav from "./Nav";
import "../css/todo.scss";

const Todo = () => {
  return (
    <div className="todo-container">
      <h1>What To Do?</h1>
      <div className="surrounding-container">
        <h2>Tregele and Surrounding Areas</h2>
        <p>
          Tregele is a small village with the only shop being the Premier which
          is located in the Dragon Petrol station. This shop has pretty much
          everything you could possibly need but for a larger food selection
          there is a Co-op located in Amlwch, a 15 minute drive away.
        </p>

        <p>There are larger supermarkets based in Penrhos and Llangefni.</p>

        <p>The closest village is Cemaes Bay.</p>

        <p>
          There are 2 pubs Stag Inn, which serves food and Ye Old Vigour Inn.
          The Harbour Hotel Bar is also open to the public.
        </p>

        <p>
          There are 2 cafes in the village, The Bell – Y Goch and Coffee Pot.
        </p>

        <p>
          The closest town is Amlwch, there is a port here and multiple pubs and
          take aways.
        </p>

        <p>
          General information on beach and dog restrictions can be found on the{" "}
          <a
            href="https://www.anglesey.gov.wales/en/Residents/Pests-pollution-dogs-and-food-safety/Dog-control/Dog-restrictions-on-Angleseys-beaches.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anglesey Gov website
          </a>
          .
        </p>

        <p>
          If you enjoy walking there are several walking books in the basket on
          the window sill of the snug.
        </p>

        <p>
          You can drive or walk to the Anglesey Coastal path from the house, by
          car this takes a couple of minutes and to walk around 25 minutes.
        </p>

        <p>
          Directions – go out of the front gate and turn left, walk towards the
          end of the road and take the right hand turn just after the last house
          on the right. Go to the end of the track that runs parallel to the
          main road and you will see a road diagonally opposite across the main
          road. Walk down there for 10 minutes and take the road on the right
          before you get to the power station. At the end of this road is a car
          park and you will see the signs for the coastal path by the car park
          entrance.
        </p>

        <p>
          There is a cold water swimming group at Cemaes, Cemaes Bay Swimmers
          and also one called Norfio Porth Eilian both are on Facebook if this
          is something you enjoy. There are several different groups located
          around the island.
        </p>
      </div>
      <div class="recommendations-container">
        <h2>Recommendations</h2>

        <h3>Food and Drink</h3>
        <p>
          The Bay View Restaurant, Cemaes does a lovely Sunday lunch, they have
          an outdoor play area and is dog friendly. We recommend booking a table
          in advance.
        </p>
        <p>
          CWT Pizza, Traeth Mawr, Cemaes does great real woodfired pizzas which
          you can enjoy eating on the benches overlooking the beach (check
          opening times on day, usually open Wednesday to Sunday until 6pm).
        </p>
        <p>
          Skye’s Creperie, Amlwch is great for all different types of crepes,
          pancakes, and brunch dishes. They do special evenings so check their
          Instagram or Facebook page for what is on.
        </p>
        <p>
          Y Wygr Fish & Chips, Cemaes are open 7 days a week from 4pm to 8pm.
          You can walk down and sit in the harbour with your food and watch the
          sunset.
        </p>
        <p>
          Lastra Farm, Amlwch is great for seafood as well as local produce. We
          recommend booking a table in advance.
        </p>
        <p>
          Catch22, Valley does lovely food with an Asian infusion. We recommend
          booking a table in advance.
        </p>
        <p>The Ring, Rhosgoch serves good pub food.</p>
        <p>
          Beau’s Tea Room in Beaumaris is Alice in Wonderland themed and does a
          lovely afternoon tea. There are artisan and food markets on at
          weekends in Beaumaris as well as plenty of eateries. All details of
          what’s on can be found online.
        </p>
        <p>
          The Sea Shanty, Trearddur Bay, is situated on the beach with great
          food and atmosphere. They also have an ice cream counter with every
          flavor you could possibly want!
        </p>
        <p>
          Monuts is a doughnut shop situated at Melin Llynnon Windmill,
          Llanddeusant. Here they make handmade doughnuts every day. You can
          also explore the windmill while there.
        </p>
        <p>
          Llefrith Nant is a milkshake shack just outside Cemaes on the turning
          to The Bay View restaurant. You can purchase fresh milkshakes from the
          machine. There are also other island produce available from the
          vending machines (card only).
        </p>

        <h3>Beaches</h3>
        <p>
          There are quiet, secluded beaches and coves all along the Anglesey
          coastal path that you can only get to by foot from the path.
        </p>
        <p>
          Cemaes is home to 2 beaches: Traeth Bach (small beach) and Traeth Mawr
          (big beach), both around a 5-minute drive and 30-minute walk. Dogs are
          not allowed on part of Traeth Mawr between 1st May and 30th September,
          however, dogs are allowed on Traeth Bach all year round.
        </p>
        <p>
          Cemlyn is a nature reserve near Tregele that is home to Tern colonies.
          There is a huge pebble beach, but dogs must be kept on leads at all
          times of the year. It is a good area to fly kites.
        </p>
        <p>
          Newborough beach is situated at the edge of Newborough Forest and is
          huge. It’s a great place to walk or spend summer days. It is on the
          South East of the island but worth the 50-minute drive. There are
          restrictions on certain parts of the beach for dogs from 1st May to
          30th September.
        </p>
        <p>
          Benllech beach is about a 25-minute drive East of Tregele and is
          another large beach with a café and public toilets. There are
          restrictions on certain parts of the beach for dogs from 1st May to
          30th September.
        </p>
        <p>
          Trearddur Bay has a long sandy beach and is about 25 minutes drive.
          There are several eateries and ice cream shops along the beach, and
          dogs are allowed on half of the beach in season.
        </p>
      </div>

      {/* <Nav /> */}
    </div>
  );
};

export default Todo;
